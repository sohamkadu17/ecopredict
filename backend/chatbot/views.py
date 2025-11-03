from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from datetime import timedelta
import re
import json, os, uuid
from dotenv import load_dotenv
import google.generativeai as genai

# Import ChatMessage model to persist conversations
try:
    from api.models import (
        ChatMessage,
        ClimateMetric,
        WeatherForecast,
        Alert,
        AgricultureAdvisory,
        HistoricalData,
    )
except Exception:
    # In some environments import may fail early; handle gracefully and persist will be skipped
    ChatMessage = None
    ClimateMetric = None
    WeatherForecast = None
    Alert = None
    AgricultureAdvisory = None
    HistoricalData = None

# Load environment variables and configure Gemini key
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DEV_FALLBACK = os.getenv("DEV_FALLBACK", "false").lower() in ("1", "true", "yes")
DEV_FALLBACK_REPLY = os.getenv("DEV_FALLBACK_REPLY", "Hi — this is a development fallback reply because the LLM is unavailable.")


def generate_dev_reply(message: str) -> str:
    """Simple rule-based reply generator for development fallback.
    Matches keywords and returns canned helpful responses so the chat feels interactive
    without requiring the external LLM."""
    if not message:
        return DEV_FALLBACK_REPLY

    m = message.lower()

    # Greeting
    if any(k in m for k in ("hi", "hello", "hey")):
        return "Hello! I'm EcoPredict assistant. Ask about current metrics, forecasts, alerts, agriculture advisories, or simulations."

    # Temperature / metric queries
    if any(k in m for k in ("temperature", "temp", "degree", "°c", "celsius")):
        try:
            if ClimateMetric is not None:
                metric = ClimateMetric.objects.filter(metric_type='temperature').order_by('-timestamp').first()
                if metric:
                    loc = metric.location or 'Global'
                    return f"Current temperature ({loc}): {metric.value}{metric.unit} (measured at {metric.timestamp.strftime('%Y-%m-%d %H:%M')})."
        except Exception as e:
            print('Error fetching temperature metric:', e)
        return "Temperature data is not available right now."

    # CO2 queries
    if any(k in m for k in ("co2", "carbon", "ppm", "emission")):
        try:
            if ClimateMetric is not None:
                metric = ClimateMetric.objects.filter(metric_type='co2').order_by('-timestamp').first()
                if metric:
                    return f"Current CO2 ({metric.location or 'Global'}): {metric.value}{metric.unit} (as of {metric.timestamp.strftime('%Y-%m-%d')})."
        except Exception as e:
            print('Error fetching CO2 metric:', e)
        return "CO2 data is not available right now."

    # Forecast queries
    if any(k in m for k in ("forecast", "weather", "tomorrow", "weekly", "daily")):
        try:
            if WeatherForecast is not None:
                # Prefer forecasts in the near future (next 7 days)
                start = timezone.now()
                end = start + timedelta(days=7)
                forecasts = WeatherForecast.objects.filter(
                    forecast_type='daily',
                    forecast_date__gte=start,
                    forecast_date__lte=end
                ).order_by('forecast_date')[:3]
                if forecasts:
                    items = [f"{f.forecast_date.strftime('%Y-%m-%d')}: {getattr(f, 'weather_condition', 'N/A')} {getattr(f, 'predicted_temperature', 'N/A')}°" for f in forecasts]
                    return "Upcoming forecasts: " + "; ".join(items)
        except Exception as e:
            print('Error fetching forecasts:', e)
        return "Forecast data is not available right now."

    # Alerts / early warnings
    if any(k in m for k in ("alert", "alerts", "flood", "drought", "warning", "heatwave")):
        try:
            if Alert is not None:
                active = Alert.objects.filter(is_active=True).order_by('-severity')[:5]
                if active:
                    items = [f"{a.title} ({a.severity}) in {a.location or 'N/A'}" for a in active]
                    return "Active alerts: " + "; ".join(items)
        except Exception as e:
            print('Error fetching alerts:', e)
        return "No active alerts found or alerts data unavailable."

    # Agriculture advisories
    if any(k in m for k in ("plant", "wheat", "rice", "crop", "agriculture", "advisory")):
        try:
            if AgricultureAdvisory is not None:
                # try to detect crop mentioned
                for crop in [c[0] for c in AgricultureAdvisory.CROP_TYPES] if hasattr(AgricultureAdvisory, 'CROP_TYPES') else []:
                    if crop in m:
                        adv = AgricultureAdvisory.objects.filter(crop_type=crop, is_active=True).order_by('-priority').first()
                        if adv:
                            return f"Advisory for {crop}: {adv.title} - {adv.advisory_text[:200]}"
                # otherwise list available crops
                if hasattr(AgricultureAdvisory, 'CROP_TYPES'):
                    crops = [c[0] for c in AgricultureAdvisory.CROP_TYPES]
                    return f"Available advisories for crops: {', '.join(crops)}. Ask 'plant wheat' to get specific advice." 
        except Exception as e:
            print('Error fetching advisories:', e)
        return "Agriculture advisories are not available right now."

    # Fallback to configured reply
    return DEV_FALLBACK_REPLY


def shorten_reply(text: str, max_chars: int = 600) -> str:
    """Normalize whitespace and truncate to a short reply, preferring sentence boundaries."""
    if not text:
        return text
    s = re.sub(r"\s+", " ", text).strip()
    if len(s) <= max_chars:
        return s
    # try to cut at last sentence-ending punctuation before max_chars
    idx = max(s.rfind('. ', 0, max_chars), s.rfind('! ', 0, max_chars), s.rfind('? ', 0, max_chars))
    if idx and idx > 0:
        return s[: idx + 1].strip()
    # fallback: hard truncate
    return s[:max_chars].rstrip() + '...'
if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
    except Exception as e:
        # log configuration error; generation will surface errors later
        print("Warning: failed to configure Gemini client:", e)
else:
    print("Warning: GEMINI_API_KEY not set in environment")
    
# Determine which model to use: prefer GEMINI_MODEL env var; otherwise try to derive from available models
GEMINI_MODEL = os.getenv("GEMINI_MODEL")
if GEMINI_MODEL:
    print(f"Using GEMINI_MODEL from env: {GEMINI_MODEL}")
else:
    # Attempt to list models and pick a reasonable default. Filter out embedding-only models
    try:
        list_resp = genai.list_models()
        model_names = []
        if isinstance(list_resp, dict) and 'models' in list_resp:
            entries = list_resp['models']
        else:
            entries = list_resp

        for m in entries:
            name = None
            if isinstance(m, dict):
                name = m.get('name') or m.get('id') or str(m)
            else:
                name = getattr(m, 'name', None) or getattr(m, 'id', None) or str(m)
            if not name:
                continue
            model_names.append(name)

        # Prefer generative/chat models and avoid embedding-only models
        preferred = [n for n in model_names if any(k in n.lower() for k in ("chat", "bison", "gemini", "vertexai", "generative"))]
        non_embedding = [n for n in model_names if not any(k in n.lower() for k in ("embed", "embedding", "vector"))]

        chosen = None
        if preferred:
            chosen = preferred[0]
        elif non_embedding:
            chosen = non_embedding[0]
        elif model_names:
            chosen = model_names[0]

        GEMINI_MODEL = chosen
        if GEMINI_MODEL:
            print(f"Auto-selected GEMINI_MODEL: {GEMINI_MODEL}")
        else:
            print("No suitable models found via list_models(); GEMINI_MODEL remains unset")
    except Exception as e:
        print("Could not list models to auto-select GEMINI_MODEL:", e)
        GEMINI_MODEL = None


@csrf_exempt
def chat_with_bot(request):
    if request.method == "POST":
        try:
            # Debug: log incoming request method, headers and body for troubleshooting
            try:
                print("[chat_with_bot] Incoming headers:", dict(request.headers))
            except Exception:
                pass
            try:
                raw_body = request.body.decode('utf-8') if isinstance(request.body, (bytes, bytearray)) else str(request.body)
                print("[chat_with_bot] Raw body:", raw_body)
            except Exception:
                raw_body = None

            try:
                data = json.loads(raw_body) if raw_body else json.loads(request.body)
            except json.JSONDecodeError as jde:
                print("[chat_with_bot] JSON decode error:", jde)
                return JsonResponse({"reply": "Invalid JSON in request body. Expecting { \"message\": \"...\" }"}, status=400)
            message = data.get("message", "")
            session_id = data.get("session_id") or str(uuid.uuid4())
            user_id = data.get("user_id")

            if not message:
                return JsonResponse({"reply": "Please enter a valid message."})

            # Persist user message if model is available
            try:
                if ChatMessage is not None:
                    ChatMessage.objects.create(
                        message_type='user',
                        message_text=message,
                        session_id=session_id,
                        user_id=user_id
                    )
            except Exception as e:
                # Log but continue - persistence should not block LLM reply
                print("Warning: failed to persist user message:", e)

            # --- Quick intent handling: weather/forecast requests ---
            try:
                lower = message.strip().lower()
                is_forecast = any(k in lower for k in ("weather", "tomorrow", "forecast", "temperature", "temp"))

                def extract_location(text: str):
                    # look for 'in <city>' pattern
                    m = re.search(r"\bin\s+([A-Za-z\.\-\s]{2,60})", text, re.IGNORECASE)
                    if m:
                        return m.group(1).strip()
                    # if message is short (1-3 words) and alphabetic, treat as location (e.g., 'pune')
                    words = text.strip().split()
                    if 1 <= len(words) <= 3 and re.match(r"^[A-Za-z\.\-\s]+$", text.strip()):
                        return text.strip()
                    return None

                # If user asked a forecast and included a location in same message, handle directly
                if is_forecast:
                    loc_in_msg = extract_location(message)
                    if loc_in_msg:
                        # query DB for tomorrow's forecast for this location
                        if WeatherForecast is not None:
                            target_date = timezone.now() + timedelta(days=1)
                            try:
                                fq = WeatherForecast.objects.filter(
                                    forecast_type='daily',
                                    location__icontains=loc_in_msg
                                ).filter(
                                    forecast_date__date=target_date.date()
                                ).order_by('forecast_date').first()
                                if fq:
                                    reply_short = f"{fq.location} — Tomorrow: {getattr(fq, 'weather_condition', 'N/A')}, high {getattr(fq, 'predicted_temperature', 'N/A')}°, on {target_date.strftime('%Y-%m-%d')}"
                                    # persist bot reply
                                    try:
                                        if ChatMessage is not None:
                                            ChatMessage.objects.create(
                                                message_type='bot',
                                                message_text=reply_short,
                                                session_id=session_id,
                                                user_id=None
                                            )
                                    except Exception as e:
                                        print('Warning: failed to persist bot forecast reply:', e)
                                    return JsonResponse({"reply": reply_short, "session_id": session_id})
                            except Exception as e:
                                print('Error querying WeatherForecast:', e)
                        # if no DB forecast, fall through to LLM to attempt generation

                # If user asked forecast but did NOT include location, check if last bot asked for location
                if is_forecast:
                    loc_guess = extract_location(message)
                    if not loc_guess and ChatMessage is not None:
                        try:
                            last_bot = ChatMessage.objects.filter(session_id=session_id, message_type='bot').order_by('-timestamp').first()
                            if last_bot and any(k in last_bot.message_text.lower() for k in ('location', 'city', 'zip', 'postal')):
                                # treat current user message as location
                                loc_guess = message.strip()
                                # now try to fetch forecast for loc_guess
                                if WeatherForecast is not None:
                                    target_date = timezone.now() + timedelta(days=1)
                                    fq = WeatherForecast.objects.filter(
                                        forecast_type='daily',
                                        location__icontains=loc_guess,
                                        forecast_date__date=target_date.date()
                                    ).order_by('forecast_date').first()
                                    if fq:
                                        reply_short = f"{fq.location} — Tomorrow: {getattr(fq, 'weather_condition', 'N/A')}, high {getattr(fq, 'predicted_temperature', 'N/A')}°, on {target_date.strftime('%Y-%m-%d')}"
                                        try:
                                            if ChatMessage is not None:
                                                ChatMessage.objects.create(
                                                    message_type='bot',
                                                    message_text=reply_short,
                                                    session_id=session_id,
                                                    user_id=None
                                                )
                                        except Exception as e:
                                            print('Warning: failed to persist bot forecast reply:', e)
                                        return JsonResponse({"reply": reply_short, "session_id": session_id})
                                # otherwise prompt for clearer location
                                return JsonResponse({"reply": "Please tell me the city or ZIP/postal code for the forecast (e.g., 'Pune' or '411001').", "session_id": session_id})
                        except Exception as e:
                            print('Error checking last_bot message:', e)
            except Exception as e:
                print('Forecast-intent handling error:', e)
            # Require GEMINI_API_KEY to proceed; return clear guidance if missing
            if not GEMINI_API_KEY:
                return JsonResponse({"reply": "Server not configured with GEMINI_API_KEY. Please set the key in backend environment."}, status=500)

            # Select model (env override preferred), fall back to a sensible default
            model_name = GEMINI_MODEL or "gemini-pro"
            reply_text = None
            gen_exception = None

            # Try configured model first, then a small list of known generative models as fallbacks.
            # This avoids 503s when the env config points to an unsupported or unavailable model.
            fallback_candidates = [
                model_name,
                "models/gemini-2.5-pro",
                "models/gemini-pro-latest",
                "models/gemini-2.5-flash",
                "models/gemini-flash-latest",
            ]
            # dedupe while preserving order
            seen = set()
            candidates = []
            for c in fallback_candidates:
                if not c:
                    continue
                if c in seen:
                    continue
                seen.add(c)
                candidates.append(c)

            for candidate in candidates:
                try:
                    print(f"[chat_with_bot] Generating with candidate model: {candidate}")
                    model = genai.GenerativeModel(candidate)
                    response = model.generate_content(f"EcoPredict Assistant: {message}")
                    reply_text = getattr(response, "text", None) or str(response)
                    print(f"[chat_with_bot] Generation succeeded with model: {candidate}")
                    break
                except Exception as gen_err:
                    gen_exception = gen_err
                    # If the error clearly indicates the model is not supported, try next candidate
                    print(f"[chat_with_bot] Candidate {candidate} failed:", gen_err)
                    continue

            # If generation failed, decide fallback behavior
            if reply_text is None:
                # If developer fallback explicitly enabled, use it so frontend remains usable locally
                if DEV_FALLBACK:
                    print("[chat_with_bot] Using DEV_FALLBACK reply after Gemini failure")
                    reply_text = generate_dev_reply(message)
                else:
                    # Log server-side error but do not expose internals to client
                    print("[chat_with_bot] Gemini generation failed and DEV_FALLBACK is disabled. Exception:", gen_exception)
                    return JsonResponse({"reply": "Temporary LLM service error. Please try again in a few moments."}, status=503)
            # ensure reply_text is a string
            reply_text = str(reply_text)

            # Persist bot message
            try:
                if ChatMessage is not None:
                    ChatMessage.objects.create(
                        message_type='bot',
                        message_text=reply_text,
                        session_id=session_id,
                        user_id=None,
                        confidence_score=None,
                        intent=None
                    )
            except Exception as e:
                print("Warning: failed to persist bot message:", e)

            # Return reply and session id so frontend can continue the conversation
            return JsonResponse({"reply": reply_text, "session_id": session_id})
        except Exception as e:
            # Log full exception and return message for development
            import traceback
            traceback.print_exc()
            return JsonResponse({"reply": f"Server error: {str(e)}"}, status=500)
    elif request.method == "GET":
        # If session_id provided, return stored chat history (if persistence available)
        session_id = request.GET.get('session_id')
        if session_id and ChatMessage is not None:
            try:
                msgs = ChatMessage.objects.filter(session_id=session_id).order_by('timestamp')
                data = [
                    {
                        'message_type': m.message_type,
                        'message_text': m.message_text,
                        'session_id': m.session_id,
                        'user_id': m.user_id,
                        'timestamp': m.timestamp.strftime('%Y-%m-%d %H:%M:%S') if getattr(m, 'timestamp', None) else None,
                    }
                    for m in msgs
                ]
                return JsonResponse(data, safe=False)
            except Exception as e:
                print('Error fetching chat history:', e)
                return JsonResponse({'error': 'Failed to fetch history'}, status=500)

        # Default GET response: usage instructions
        return JsonResponse({
            'message': 'EcoPredict chat endpoint. Send POST {"message": "..."} to receive an LLM reply. Optional: include session_id to persist conversation.'
        })
    else:
        return JsonResponse({"error": "Invalid request method."}, status=400)
