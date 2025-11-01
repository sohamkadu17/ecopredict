from django.contrib import admin
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


@admin.register(ClimateMetric)
class ClimateMetricAdmin(admin.ModelAdmin):
    list_display = ['metric_type', 'value', 'unit', 'location', 'timestamp', 'source']
    list_filter = ['metric_type', 'location', 'timestamp']
    search_fields = ['location', 'metric_type']
    date_hierarchy = 'timestamp'


@admin.register(HistoricalData)
class HistoricalDataAdmin(admin.ModelAdmin):
    list_display = ['period_type', 'period_start', 'location', 'avg_temperature', 'total_rainfall']
    list_filter = ['period_type', 'location']
    date_hierarchy = 'period_start'


@admin.register(WeatherForecast)
class WeatherForecastAdmin(admin.ModelAdmin):
    list_display = ['forecast_type', 'forecast_date', 'predicted_temperature', 'weather_condition', 'confidence_score', 'location']
    list_filter = ['forecast_type', 'weather_condition', 'location']
    search_fields = ['location', 'description']
    date_hierarchy = 'forecast_date'


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ['title', 'alert_type', 'severity', 'is_active', 'location', 'start_time']
    list_filter = ['alert_type', 'severity', 'is_active', 'is_resolved']
    search_fields = ['title', 'description', 'location']
    date_hierarchy = 'created_at'
    actions = ['mark_as_resolved', 'mark_as_active']
    
    def mark_as_resolved(self, request, queryset):
        queryset.update(is_resolved=True, is_active=False)
    mark_as_resolved.short_description = "Mark selected alerts as resolved"
    
    def mark_as_active(self, request, queryset):
        queryset.update(is_active=True, is_resolved=False)
    mark_as_active.short_description = "Mark selected alerts as active"


@admin.register(AgricultureAdvisory)
class AgricultureAdvisoryAdmin(admin.ModelAdmin):
    list_display = ['crop_type', 'title', 'priority', 'location', 'is_active', 'created_at']
    list_filter = ['crop_type', 'is_active', 'location']
    search_fields = ['title', 'advisory_text']
    ordering = ['-priority', '-created_at']


@admin.register(PolicyInsight)
class PolicyInsightAdmin(admin.ModelAdmin):
    list_display = ['category', 'title', 'priority', 'implementation_difficulty', 'is_featured', 'location']
    list_filter = ['category', 'is_featured', 'implementation_difficulty']
    search_fields = ['title', 'description']
    ordering = ['-priority', '-created_at']


@admin.register(Simulation)
class SimulationAdmin(admin.ModelAdmin):
    list_display = ['simulation_name', 'temperature_change', 'co2_change', 'rainfall_change', 'confidence_score', 'created_at']
    list_filter = ['model_version', 'created_at']
    search_fields = ['simulation_name']
    date_hierarchy = 'created_at'


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['message_type', 'message_text_preview', 'session_id', 'timestamp']
    list_filter = ['message_type', 'timestamp']
    search_fields = ['message_text', 'session_id', 'user_id']
    date_hierarchy = 'timestamp'
    
    def message_text_preview(self, obj):
        return obj.message_text[:50] + "..." if len(obj.message_text) > 50 else obj.message_text
    message_text_preview.short_description = "Message"
