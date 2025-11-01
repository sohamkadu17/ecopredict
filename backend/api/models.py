from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


class ClimateMetric(models.Model):
    """Model for storing real-time climate metrics"""
    METRIC_TYPES = [
        ('temperature', 'Temperature'),
        ('rainfall', 'Rainfall'),
        ('co2', 'CO2 Emissions'),
        ('humidity', 'Humidity'),
        ('wind_speed', 'Wind Speed'),
        ('pressure', 'Atmospheric Pressure'),
    ]
    
    metric_type = models.CharField(max_length=20, choices=METRIC_TYPES)
    value = models.FloatField()
    unit = models.CharField(max_length=20)
    location = models.CharField(max_length=100, null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True, validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitude = models.FloatField(null=True, blank=True, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)
    source = models.CharField(max_length=100, default='system')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['metric_type', '-timestamp']),
            models.Index(fields=['location', '-timestamp']),
        ]
    
    def __str__(self):
        return f"{self.metric_type}: {self.value}{self.unit} at {self.timestamp}"


class HistoricalData(models.Model):
    """Model for storing aggregated historical climate data"""
    PERIOD_TYPES = [
        ('hourly', 'Hourly'),
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ]
    
    period_type = models.CharField(max_length=10, choices=PERIOD_TYPES)
    period_start = models.DateTimeField(db_index=True)
    period_end = models.DateTimeField()
    
    # Aggregated values
    avg_temperature = models.FloatField(null=True, blank=True)
    min_temperature = models.FloatField(null=True, blank=True)
    max_temperature = models.FloatField(null=True, blank=True)
    
    total_rainfall = models.FloatField(null=True, blank=True)
    avg_humidity = models.FloatField(null=True, blank=True)
    avg_co2 = models.FloatField(null=True, blank=True)
    avg_wind_speed = models.FloatField(null=True, blank=True)
    avg_pressure = models.FloatField(null=True, blank=True)
    
    location = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-period_start']
        unique_together = ['period_type', 'period_start', 'location']
        indexes = [
            models.Index(fields=['period_type', '-period_start']),
        ]
    
    def __str__(self):
        return f"{self.period_type} data: {self.period_start.date()}"


class WeatherForecast(models.Model):
    """Model for storing weather and climate forecasts"""
    FORECAST_TYPES = [
        ('hourly', 'Hourly'),
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
    ]
    
    forecast_type = models.CharField(max_length=10, choices=FORECAST_TYPES)
    forecast_date = models.DateTimeField(db_index=True)
    
    # Predicted values
    predicted_temperature = models.FloatField()
    predicted_min_temp = models.FloatField(null=True, blank=True)
    predicted_max_temp = models.FloatField(null=True, blank=True)
    predicted_rainfall = models.FloatField(null=True, blank=True)
    predicted_humidity = models.FloatField(null=True, blank=True)
    predicted_wind_speed = models.FloatField(null=True, blank=True)
    predicted_co2 = models.FloatField(null=True, blank=True)
    
    # Confidence and accuracy
    confidence_score = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    model_version = models.CharField(max_length=50, default='v1.0')
    
    # Metadata
    location = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    weather_condition = models.CharField(max_length=50, null=True, blank=True)  # sunny, rainy, cloudy, etc.
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['forecast_date']
        indexes = [
            models.Index(fields=['forecast_type', 'forecast_date']),
            models.Index(fields=['location', 'forecast_date']),
        ]
    
    def __str__(self):
        return f"{self.forecast_type} forecast for {self.forecast_date.date()}"


class Alert(models.Model):
    """Model for storing weather alerts and warnings"""
    SEVERITY_LEVELS = [
        ('info', 'Information'),
        ('warning', 'Warning'),
        ('critical', 'Critical'),
    ]
    
    ALERT_TYPES = [
        ('extreme_heat', 'Extreme Heat'),
        ('extreme_cold', 'Extreme Cold'),
        ('heavy_rain', 'Heavy Rain'),
        ('drought', 'Drought'),
        ('storm', 'Storm'),
        ('flood', 'Flood'),
        ('high_co2', 'High CO2 Levels'),
        ('air_quality', 'Poor Air Quality'),
    ]
    
    alert_type = models.CharField(max_length=20, choices=ALERT_TYPES)
    severity = models.CharField(max_length=10, choices=SEVERITY_LEVELS)
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=100, null=True, blank=True)
    
    # Time information
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True, db_index=True)
    is_resolved = models.BooleanField(default=False)
    
    # Metadata
    affected_areas = models.TextField(null=True, blank=True)  # JSON list of areas
    recommendations = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['is_active', '-created_at']),
            models.Index(fields=['severity', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.severity.upper()}: {self.title}"


class AgricultureAdvisory(models.Model):
    """Model for agriculture-specific recommendations"""
    CROP_TYPES = [
        ('wheat', 'Wheat'),
        ('rice', 'Rice'),
        ('corn', 'Corn'),
        ('soybean', 'Soybean'),
        ('cotton', 'Cotton'),
        ('vegetables', 'Vegetables'),
        ('fruits', 'Fruits'),
        ('other', 'Other'),
    ]
    
    crop_type = models.CharField(max_length=20, choices=CROP_TYPES)
    title = models.CharField(max_length=200)
    advisory_text = models.TextField()
    
    # Climate conditions
    optimal_temp_min = models.FloatField(null=True, blank=True)
    optimal_temp_max = models.FloatField(null=True, blank=True)
    water_requirement = models.CharField(max_length=50, null=True, blank=True)
    
    # Recommendations
    planting_window_start = models.DateField(null=True, blank=True)
    planting_window_end = models.DateField(null=True, blank=True)
    irrigation_advice = models.TextField(null=True, blank=True)
    pest_warning = models.TextField(null=True, blank=True)
    
    # Metadata
    location = models.CharField(max_length=100, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    priority = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-priority', '-created_at']
        verbose_name_plural = 'Agriculture advisories'
    
    def __str__(self):
        return f"{self.crop_type}: {self.title}"


class PolicyInsight(models.Model):
    """Model for policy recommendations and insights"""
    POLICY_CATEGORIES = [
        ('emission_reduction', 'Emission Reduction'),
        ('renewable_energy', 'Renewable Energy'),
        ('water_management', 'Water Management'),
        ('agriculture', 'Agriculture'),
        ('urban_planning', 'Urban Planning'),
        ('disaster_preparedness', 'Disaster Preparedness'),
        ('conservation', 'Conservation'),
    ]
    
    category = models.CharField(max_length=30, choices=POLICY_CATEGORIES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    
    # Impact metrics
    potential_impact = models.TextField(null=True, blank=True)
    implementation_difficulty = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="1=Easy, 5=Very Difficult"
    )
    estimated_cost = models.CharField(max_length=100, null=True, blank=True)
    
    # Recommendations
    action_items = models.TextField()
    timeline = models.CharField(max_length=100, null=True, blank=True)
    stakeholders = models.TextField(null=True, blank=True)
    
    # Supporting data
    data_sources = models.TextField(null=True, blank=True)
    success_examples = models.TextField(null=True, blank=True)
    
    # Metadata
    location = models.CharField(max_length=100, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    priority = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-priority', '-created_at']
    
    def __str__(self):
        return f"{self.category}: {self.title}"


class Simulation(models.Model):
    """Model for storing climate scenario simulations"""
    # Input parameters
    temperature_change = models.FloatField(help_text="Temperature change in Celsius")
    co2_change = models.FloatField(help_text="CO2 change in ppm")
    rainfall_change = models.FloatField(help_text="Rainfall change in percentage")
    
    # Output predictions
    predicted_temp_impact = models.FloatField(null=True, blank=True)
    predicted_rainfall_impact = models.FloatField(null=True, blank=True)
    predicted_agriculture_impact = models.TextField(null=True, blank=True)
    predicted_ecosystem_impact = models.TextField(null=True, blank=True)
    
    # Simulation metadata
    simulation_name = models.CharField(max_length=200, null=True, blank=True)
    model_version = models.CharField(max_length=50, default='v1.0')
    confidence_score = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True,
        blank=True
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Simulation: {self.simulation_name or self.id} ({self.created_at.date()})"


class ChatMessage(models.Model):
    """Model for storing chatbot conversations"""
    MESSAGE_TYPES = [
        ('user', 'User'),
        ('bot', 'Bot'),
    ]
    
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    message_text = models.TextField()
    
    # Context and metadata
    session_id = models.CharField(max_length=100, db_index=True)
    user_id = models.CharField(max_length=100, null=True, blank=True)
    
    # Response metadata (for bot messages)
    confidence_score = models.FloatField(null=True, blank=True)
    intent = models.CharField(max_length=100, null=True, blank=True)
    entities = models.JSONField(null=True, blank=True)
    
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['timestamp']
        indexes = [
            models.Index(fields=['session_id', 'timestamp']),
        ]
    
    def __str__(self):
        return f"{self.message_type}: {self.message_text[:50]}"
