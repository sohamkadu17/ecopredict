

#!/usr/bin/env python3
"""
Diagnostic helper for Gemini / genai SDK.

Run from the backend folder to list available models and attempt a simple generation
with the configured GEMINI_MODEL (or an auto-selected candidate). Helpful when
debugging 403/404/503 errors from the LLM.

Usage:
  python diag_genai.py

This script reads configuration from the environment or a .env file:
  GEMINI_API_KEY  - API key used to authenticate with the Gemini SDK
  GEMINI_MODEL    - optional model name to test (if unset the script will try to
                    auto-select a generative model from the model list)

The script prints human-readable diagnostic information and returns non-zero on
fatal failures.
"""
import os
import sys
import traceback
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL")


def safe_print(title, value):
    print(f"== {title} ==")
    if value is None:
        print("<none>")
    elif isinstance(value, (list, tuple)):
        for i, v in enumerate(value[:50]):
            print(f"  {i+1}. {v}")
        if len(value) > 50:
            print(f"  ... and {len(value)-50} more")
    else:
        print(value)
    print()


def main():
    safe_print("GEMINI_API_KEY present", bool(GEMINI_API_KEY))
    safe_print("GEMINI_MODEL (env)", GEMINI_MODEL)

    try:
        import google.generativeai as genai
    except Exception as e:
        print("Failed to import genai SDK:", e)
        traceback.print_exc()
        sys.exit(2)

    if not GEMINI_API_KEY:
        print("No GEMINI_API_KEY found in environment. Set it in .env or the shell and retry.")
        sys.exit(3)

    try:
        genai.configure(api_key=GEMINI_API_KEY)
        print("Configured genai client with provided API key.")
    except Exception as e:
        print("genai.configure() failed:", e)
        traceback.print_exc()

    # List models
    try:
        list_resp = genai.list_models()
        model_names = []
        if isinstance(list_resp, dict) and 'models' in list_resp:
            entries = list_resp['models']
        else:
            entries = list_resp

        for m in entries:
            if isinstance(m, dict):
                name = m.get('name') or m.get('id') or str(m)
            else:
                name = getattr(m, 'name', None) or getattr(m, 'id', None) or str(m)
            model_names.append(name)

        safe_print("Available models (sample)", model_names)
    except Exception as e:
        print("list_models() failed:", e)
        traceback.print_exc()
        model_names = []

    # Pick a candidate model
    candidate = GEMINI_MODEL
    if not candidate:
        # prefer generative/chat models and avoid embedding-only models
        preferred = [n for n in model_names if any(k in n.lower() for k in ("chat", "bison", "gemini", "generative"))]
        non_embedding = [n for n in model_names if not any(k in n.lower() for k in ("embed", "embedding", "vector"))]
        if preferred:
            candidate = preferred[0]
        elif non_embedding:
            candidate = non_embedding[0]
        elif model_names:
            candidate = model_names[0]

    safe_print("Candidate model to test", candidate)

    if not candidate:
        print("No model available to test. Ensure your API key has access to models or set GEMINI_MODEL explicitly.")
        sys.exit(4)

    # Attempt a simple generation call
    prompt = "Please reply briefly: what is the weather forecast summary for the next 3 days?"
    try:
        print(f"Attempting simple generation with model: {candidate}")
        model = genai.GenerativeModel(candidate)
        response = model.generate_content(prompt)
        # SDKs vary; prefer .text
        reply = getattr(response, 'text', None) or str(response)
        safe_print("Generation result (truncated)", (reply[:1000] + '...') if reply and len(reply) > 1000 else reply)
        print("Generation succeeded.")
    except Exception as e:
        print("Generation call failed:", e)
        traceback.print_exc()
        # Provide helpful hints
        print()
        print("Hints:")
        print(" - Check that GEMINI_API_KEY is valid and has access to the selected model.")
        print(" - If the SDK reports the model is not found or unsupported for generateContent, pick a generative/chat model (names often contain 'chat' or 'bison' rather than 'embedding').")
        print(" - If you see permission/403 errors, ensure the key has correct IAM permissions and is not restricted by IP or referrer.")
        sys.exit(5)

    return 0


if __name__ == '__main__':
    sys.exit(main())
