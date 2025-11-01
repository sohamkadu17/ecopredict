from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from django.db.models import Avg, Min, Max, Count, Q
from datetime import timedelta
import random
import uuid

from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    ClimateMetric,
    HistoricalData,
    WeatherForecast,
    Alert,
    AgricultureAdvisory,
    PolicyInsight,
    Simulation,
    ChatMessage
)
from .serializers import (
    ClimateMetricSerializer,
    ClimateMetricListSerializer,
    HistoricalDataSerializer,
    WeatherForecastSerializer,
    WeatherForecastListSerializer,
    AlertSerializer,
    AlertListSerializer,
    AgricultureAdvisorySerializer,
    PolicyInsightSerializer,
    SimulationSerializer,
    SimulationCreateSerializer,
    ChatMessageSerializer,
    ChatMessageCreateSerializer,
    MetricStatisticsSerializer
)


# Legacy view - keep for backwards compatibility
def dashboard(request):
    return HttpResponse('<H1>EcoPredict API - Use /api/ endpoints</H1>')


class ClimateMetricViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing climate metrics
    
    list: Get all climate metrics
    retrieve: Get a specific metric
    create: Create a new metric
    update: Update a metric
    destroy: Delete a metric
    """
    queryset = ClimateMetric.objects.all()
    serializer_class = ClimateMetricSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['metric_type', 'location']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ClimateMetricListSerializer
        return ClimateMetricSerializer
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get the most recent metrics for all types"""
        metric_types = ['temperature', 'rainfall', 'co2', 'humidity', 'wind_speed', 'pressure']
        current_metrics = []
        
        for metric_type in metric_types:
            metric = ClimateMetric.objects.filter(
                metric_type=metric_type
            ).order_by('-timestamp').first()
            
            if metric:
                current_metrics.append(ClimateMetricSerializer(metric).data)
        
        return Response(current_metrics)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get aggregated statistics for all metric types"""
        metric_type = request.query_params.get('type', 'temperature')
        days = int(request.query_params.get('days', 7))
        
        start_date = timezone.now() - timedelta(days=days)
        
        metrics = ClimateMetric.objects.filter(
            metric_type=metric_type,
            timestamp__gte=start_date
        )
        
        if not metrics.exists():
            return Response({
                'metric_type': metric_type,
                'message': 'No data available'
            })
        
        stats = metrics.aggregate(
            avg_value=Avg('value'),
            min_value=Min('value'),
            max_value=Max('value'),
        )
        
        current = metrics.order_by('-timestamp').first()
        
        data = {
            'metric_type': metric_type,
            'current_value': current.value if current else None,
            'avg_value': round(stats['avg_value'], 2) if stats['avg_value'] else None,
            'min_value': round(stats['min_value'], 2) if stats['min_value'] else None,
            'max_value': round(stats['max_value'], 2) if stats['max_value'] else None,
            'unit': current.unit if current else None,
            'period_days': days
        }
        
        return Response(data)


class HistoricalDataViewSet(viewsets.ModelViewSet):
    """ViewSet for historical climate data"""
    queryset = HistoricalData.objects.all()
    serializer_class = HistoricalDataSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['period_type', 'location']
    
    @action(detail=False, methods=['get'])
    def trends(self, request):
        """Get trend data for a specific period"""
        period_type = request.query_params.get('period', 'daily')
        days = int(request.query_params.get('days', 30))
        
        start_date = timezone.now() - timedelta(days=days)
        
        data = HistoricalData.objects.filter(
            period_type=period_type,
            period_start__gte=start_date
        ).order_by('period_start')
        
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data)


class WeatherForecastViewSet(viewsets.ModelViewSet):
    """ViewSet for weather forecasts"""
    queryset = WeatherForecast.objects.all()
    serializer_class = WeatherForecastSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['forecast_type', 'location', 'weather_condition']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return WeatherForecastListSerializer
        return WeatherForecastSerializer
    
    @action(detail=False, methods=['get'])
    def daily(self, request):
        """Get daily forecasts for the next 7 days"""
        start_date = timezone.now()
        end_date = start_date + timedelta(days=7)
        
        forecasts = WeatherForecast.objects.filter(
            forecast_type='daily',
            forecast_date__gte=start_date,
            forecast_date__lte=end_date
        ).order_by('forecast_date')
        
        serializer = WeatherForecastListSerializer(forecasts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def weekly(self, request):
        """Get weekly forecasts"""
        forecasts = WeatherForecast.objects.filter(
            forecast_type='weekly'
        ).order_by('forecast_date')[:4]
        
        serializer = WeatherForecastListSerializer(forecasts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def hourly(self, request):
        """Get hourly forecasts for the next 24 hours"""
        start_date = timezone.now()
        end_date = start_date + timedelta(hours=24)
        
        forecasts = WeatherForecast.objects.filter(
            forecast_type='hourly',
            forecast_date__gte=start_date,
            forecast_date__lte=end_date
        ).order_by('forecast_date')
        
        serializer = WeatherForecastListSerializer(forecasts, many=True)
        return Response(serializer.data)


class AlertViewSet(viewsets.ModelViewSet):
    """ViewSet for weather alerts"""
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['alert_type', 'severity', 'is_active', 'location']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AlertListSerializer
        return AlertSerializer
    
    def get_queryset(self):
        queryset = Alert.objects.all()
        
        # Filter active alerts by default
        active_only = self.request.query_params.get('active_only', 'true')
        if active_only.lower() == 'true':
            queryset = queryset.filter(is_active=True)
        
        return queryset.order_by('-created_at')
    
    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        """Mark an alert as resolved"""
        alert = self.get_object()
        alert.is_resolved = True
        alert.is_active = False
        alert.save()
        
        serializer = self.get_serializer(alert)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active alerts"""
        alerts = Alert.objects.filter(
            is_active=True,
            is_resolved=False
        ).order_by('-severity', '-created_at')
        
        serializer = AlertListSerializer(alerts, many=True)
        return Response(serializer.data)


class AgricultureAdvisoryViewSet(viewsets.ModelViewSet):
    """ViewSet for agriculture advisories"""
    queryset = AgricultureAdvisory.objects.filter(is_active=True)
    serializer_class = AgricultureAdvisorySerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['crop_type', 'location']
    
    @action(detail=False, methods=['get'])
    def by_crop(self, request):
        """Get advisories filtered by crop type"""
        crop_type = request.query_params.get('crop', 'wheat')
        
        advisories = AgricultureAdvisory.objects.filter(
            crop_type=crop_type,
            is_active=True
        ).order_by('-priority', '-created_at')
        
        serializer = self.get_serializer(advisories, many=True)
        return Response(serializer.data)


class PolicyInsightViewSet(viewsets.ModelViewSet):
    """ViewSet for policy insights"""
    queryset = PolicyInsight.objects.all()
    serializer_class = PolicyInsightSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'is_featured', 'location']
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured policy insights"""
        insights = PolicyInsight.objects.filter(
            is_featured=True
        ).order_by('-priority', '-created_at')[:5]
        
        serializer = self.get_serializer(insights, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get insights filtered by category"""
        category = request.query_params.get('category', 'emission_reduction')
        
        insights = PolicyInsight.objects.filter(
            category=category
        ).order_by('-priority', '-created_at')
        
        serializer = self.get_serializer(insights, many=True)
        return Response(serializer.data)


class SimulationViewSet(viewsets.ModelViewSet):
    """ViewSet for climate simulations"""
    queryset = Simulation.objects.all()
    serializer_class = SimulationSerializer
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return SimulationCreateSerializer
        return SimulationSerializer
    
    def create(self, request, *args, **kwargs):
        """Create a new simulation and generate predictions"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Extract input parameters
        temp_change = serializer.validated_data['temperature_change']
        co2_change = serializer.validated_data['co2_change']
        rainfall_change = serializer.validated_data['rainfall_change']
        simulation_name = serializer.validated_data.get('simulation_name', f'Simulation {uuid.uuid4().hex[:8]}')
        
        # Simple prediction logic (replace with actual ML model)
        predicted_temp_impact = temp_change * 1.2  # 20% amplification
        predicted_rainfall_impact = rainfall_change * 0.8  # 20% dampening
        
        # Agriculture impact assessment
        if temp_change > 2 or rainfall_change < -20:
            agriculture_impact = "Severe negative impact on crop yields expected"
        elif temp_change > 1 or rainfall_change < -10:
            agriculture_impact = "Moderate impact on agriculture expected"
        else:
            agriculture_impact = "Minimal impact on agriculture expected"
        
        # Ecosystem impact assessment
        if co2_change > 100 or temp_change > 2:
            ecosystem_impact = "Critical ecosystem disruption likely"
        elif co2_change > 50 or temp_change > 1:
            ecosystem_impact = "Moderate ecosystem stress expected"
        else:
            ecosystem_impact = "Ecosystem can adapt to these changes"
        
        # Create simulation record
        simulation = Simulation.objects.create(
            temperature_change=temp_change,
            co2_change=co2_change,
            rainfall_change=rainfall_change,
            simulation_name=simulation_name,
            predicted_temp_impact=predicted_temp_impact,
            predicted_rainfall_impact=predicted_rainfall_impact,
            predicted_agriculture_impact=agriculture_impact,
            predicted_ecosystem_impact=ecosystem_impact,
            confidence_score=round(random.uniform(75, 95), 2)  # Replace with actual confidence
        )
        
        result_serializer = SimulationSerializer(simulation)
        return Response(result_serializer.data, status=status.HTTP_201_CREATED)


class ChatMessageViewSet(viewsets.ModelViewSet):
    """ViewSet for chatbot messages"""
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['session_id', 'message_type']
    
    @action(detail=False, methods=['post'])
    def query(self, request):
        """Process a user query and return bot response"""
        serializer = ChatMessageCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user_message = serializer.validated_data['message']
        session_id = serializer.validated_data.get('session_id', str(uuid.uuid4()))
        user_id = serializer.validated_data.get('user_id')
        
        # Save user message
        user_msg = ChatMessage.objects.create(
            message_type='user',
            message_text=user_message,
            session_id=session_id,
            user_id=user_id
        )
        
        # Generate bot response (replace with actual AI/ML model)
        bot_response = self.generate_bot_response(user_message)
        
        # Save bot message
        bot_msg = ChatMessage.objects.create(
            message_type='bot',
            message_text=bot_response['message'],
            session_id=session_id,
            confidence_score=bot_response['confidence'],
            intent=bot_response['intent']
        )
        
        return Response({
            'session_id': session_id,
            'user_message': ChatMessageSerializer(user_msg).data,
            'bot_response': ChatMessageSerializer(bot_msg).data
        })
    
    def generate_bot_response(self, message):
        """Generate a bot response based on user message (placeholder)"""
        message_lower = message.lower()
        
        # Simple keyword-based responses (replace with actual NLP/LLM)
        if 'temperature' in message_lower or 'hot' in message_lower or 'heat' in message_lower:
            return {
                'message': "Based on current data, the average temperature has increased by 0.8°C over the past decade. Would you like to see detailed temperature trends or forecasts?",
                'confidence': 0.89,
                'intent': 'temperature_query'
            }
        elif 'rain' in message_lower or 'rainfall' in message_lower or 'precipitation' in message_lower:
            return {
                'message': "Rainfall patterns show significant variability. I can provide daily, weekly, or seasonal rainfall forecasts. Which would you prefer?",
                'confidence': 0.85,
                'intent': 'rainfall_query'
            }
        elif 'co2' in message_lower or 'carbon' in message_lower or 'emission' in message_lower:
            return {
                'message': "CO2 levels have been monitored continuously. Current atmospheric CO2 is approximately 420 ppm. I can show you emission trends and reduction strategies.",
                'confidence': 0.91,
                'intent': 'co2_query'
            }
        elif 'forecast' in message_lower or 'predict' in message_lower:
            return {
                'message': "I can provide various types of forecasts including daily weather, weekly climate trends, and long-term predictions. What specific forecast are you interested in?",
                'confidence': 0.87,
                'intent': 'forecast_query'
            }
        elif 'agriculture' in message_lower or 'farming' in message_lower or 'crop' in message_lower:
            return {
                'message': "Our agriculture advisory system provides crop-specific recommendations based on current climate conditions. Which crop are you interested in learning about?",
                'confidence': 0.86,
                'intent': 'agriculture_query'
            }
        else:
            return {
                'message': "I'm EcoPredict AI, your climate intelligence assistant. I can help you with temperature trends, rainfall forecasts, CO2 emissions data, agriculture advisories, and policy insights. What would you like to know?",
                'confidence': 0.75,
                'intent': 'general_query'
            }
    
    @action(detail=False, methods=['get'])
    def history(self, request):
        """Get chat history for a session"""
        session_id = request.query_params.get('session_id')
        
        if not session_id:
            return Response(
                {'error': 'session_id parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        messages = ChatMessage.objects.filter(
            session_id=session_id
        ).order_by('timestamp')
        
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def api_overview(request):
    """API Overview endpoint"""
    return Response({
        'message': 'Welcome to EcoPredict API',
        'version': '1.0.0',
        'endpoints': {
            'metrics': '/api/metrics/',
            'historical': '/api/historical/',
            'forecasts': '/api/forecasts/',
            'alerts': '/api/alerts/',
            'agriculture': '/api/agriculture/',
            'policy': '/api/policy/',
            'simulate': '/api/simulate/',
            'chatbot': '/api/chatbot/',
        },
        'documentation': '/api/docs/'
    })



