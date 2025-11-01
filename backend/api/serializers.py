from rest_framework import serializers
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


class ClimateMetricSerializer(serializers.ModelSerializer):
    """Serializer for ClimateMetric model"""
    
    class Meta:
        model = ClimateMetric
        fields = '__all__'
        read_only_fields = ['created_at']


class ClimateMetricListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    
    class Meta:
        model = ClimateMetric
        fields = ['id', 'metric_type', 'value', 'unit', 'timestamp', 'location']


class HistoricalDataSerializer(serializers.ModelSerializer):
    """Serializer for HistoricalData model"""
    
    class Meta:
        model = HistoricalData
        fields = '__all__'
        read_only_fields = ['created_at']


class WeatherForecastSerializer(serializers.ModelSerializer):
    """Serializer for WeatherForecast model"""
    
    class Meta:
        model = WeatherForecast
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class WeatherForecastListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for forecast list views"""
    
    class Meta:
        model = WeatherForecast
        fields = [
            'id', 'forecast_type', 'forecast_date', 'predicted_temperature',
            'predicted_min_temp', 'predicted_max_temp', 'weather_condition',
            'confidence_score', 'location'
        ]


class AlertSerializer(serializers.ModelSerializer):
    """Serializer for Alert model"""
    
    class Meta:
        model = Alert
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class AlertListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for alert list views"""
    
    class Meta:
        model = Alert
        fields = [
            'id', 'alert_type', 'severity', 'title', 'location',
            'start_time', 'is_active', 'is_resolved'
        ]


class AgricultureAdvisorySerializer(serializers.ModelSerializer):
    """Serializer for AgricultureAdvisory model"""
    
    class Meta:
        model = AgricultureAdvisory
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class PolicyInsightSerializer(serializers.ModelSerializer):
    """Serializer for PolicyInsight model"""
    
    class Meta:
        model = PolicyInsight
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class SimulationSerializer(serializers.ModelSerializer):
    """Serializer for Simulation model"""
    
    class Meta:
        model = Simulation
        fields = '__all__'
        read_only_fields = ['created_at']


class SimulationCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating simulations with input parameters"""
    
    class Meta:
        model = Simulation
        fields = [
            'temperature_change', 'co2_change', 'rainfall_change', 'simulation_name'
        ]


class ChatMessageSerializer(serializers.ModelSerializer):
    """Serializer for ChatMessage model"""
    
    class Meta:
        model = ChatMessage
        fields = '__all__'
        read_only_fields = ['timestamp']


class ChatMessageCreateSerializer(serializers.Serializer):
    """Serializer for creating chat messages"""
    message = serializers.CharField(max_length=5000)
    session_id = serializers.CharField(max_length=100, required=False)
    user_id = serializers.CharField(max_length=100, required=False)


# Statistics Serializers
class MetricStatisticsSerializer(serializers.Serializer):
    """Serializer for aggregated metric statistics"""
    metric_type = serializers.CharField()
    current_value = serializers.FloatField()
    avg_value = serializers.FloatField()
    min_value = serializers.FloatField()
    max_value = serializers.FloatField()
    change_percentage = serializers.FloatField()
    unit = serializers.CharField()
