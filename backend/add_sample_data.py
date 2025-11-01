#!/usr/bin/env python
"""
Quick script to populate database with sample climate data
Run with: python add_sample_data.py
"""

import os
import sys
import django
from datetime import datetime, timedelta
from random import uniform, choice

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.utils import timezone
from api.models import (
    ClimateMetric,
    Alert,
    WeatherForecast,
    AgricultureAdvisory,
    PolicyInsight,
    HistoricalData
)

def create_climate_metrics():
    """Create sample climate metrics"""
    print("Creating climate metrics...")
    
    locations = ['Mumbai', 'Delhi', 'Bangalore', 'Global']
    
    # Temperature
    for i in range(10):
        ClimateMetric.objects.create(
            metric_type='temperature',
            value=round(uniform(22, 35), 1),
            unit='°C',
            location=choice(locations),
            timestamp=timezone.now() - timedelta(hours=i),
            source='sample_data'
        )
    
    # Rainfall
    for i in range(10):
        ClimateMetric.objects.create(
            metric_type='rainfall',
            value=round(uniform(0, 500), 0),
            unit='mm',
            location=choice(locations),
            timestamp=timezone.now() - timedelta(hours=i),
            source='sample_data'
        )
    
    # CO2
    for i in range(10):
        ClimateMetric.objects.create(
            metric_type='co2',
            value=round(uniform(400, 430), 1),
            unit='ppm',
            location='Global',
            timestamp=timezone.now() - timedelta(hours=i),
            source='sample_data'
        )
    
    # Humidity
    for i in range(10):
        ClimateMetric.objects.create(
            metric_type='humidity',
            value=round(uniform(40, 85), 0),
            unit='%',
            location=choice(locations),
            timestamp=timezone.now() - timedelta(hours=i),
            source='sample_data'
        )
    
    # Wind Speed
    for i in range(10):
        ClimateMetric.objects.create(
            metric_type='wind_speed',
            value=round(uniform(5, 25), 1),
            unit='km/h',
            location=choice(locations),
            timestamp=timezone.now() - timedelta(hours=i),
            source='sample_data'
        )
    
    # Pressure
    for i in range(10):
        ClimateMetric.objects.create(
            metric_type='pressure',
            value=round(uniform(990, 1020), 0),
            unit='hPa',
            location=choice(locations),
            timestamp=timezone.now() - timedelta(hours=i),
            source='sample_data'
        )
    
    print(f"OK - Created {ClimateMetric.objects.count()} climate metrics")


def create_alerts():
    """Create sample alerts"""
    print("Creating alerts...")
    
    alerts_data = [
        {
            'alert_type': 'extreme_heat',
            'severity': 'critical',
            'title': 'Extreme Heat Warning',
            'description': 'Temperature is expected to reach 40°C in the next 24 hours. Stay hydrated and avoid outdoor activities.',
            'location': 'Mumbai',
        },
        {
            'alert_type': 'heavy_rain',
            'severity': 'warning',
            'title': 'Heavy Rainfall Alert',
            'description': 'Moderate to heavy rainfall expected in coastal areas. Possible waterlogging in low-lying areas.',
            'location': 'Delhi',
        },
        {
            'alert_type': 'high_co2',
            'severity': 'warning',
            'title': 'Rising CO2 Levels',
            'description': 'Atmospheric CO2 levels have exceeded 420 ppm. Long-term climate impacts expected.',
            'location': 'Global',
        },
        {
            'alert_type': 'air_quality',
            'severity': 'warning',
            'title': 'Moderate Air Quality',
            'description': 'Air Quality Index (AQI) is at moderate levels. Sensitive individuals should limit prolonged outdoor activities.',
            'location': 'Bangalore',
        },
        {
            'alert_type': 'drought',
            'severity': 'info',
            'title': 'Drought Watch',
            'description': 'Below-normal rainfall recorded in the region. Water conservation measures recommended.',
            'location': 'Maharashtra',
        },
    ]
    
    for alert_data in alerts_data:
        Alert.objects.create(
            **alert_data,
            start_time=timezone.now(),
            is_active=True,
            is_resolved=False,
            recommendations='Follow official guidelines and stay informed.'
        )
    
    print(f"OK - Created {Alert.objects.count()} alerts")


def create_forecasts():
    """Create sample weather forecasts"""
    print("Creating forecasts...")
    
    weather_conditions = ['sunny', 'cloudy', 'rainy', 'partly_cloudy', 'stormy']
    locations = ['Mumbai', 'Delhi', 'Bangalore']
    
    # Daily forecasts (next 7 days)
    for day in range(1, 8):
        for location in locations:
            WeatherForecast.objects.create(
                forecast_type='daily',
                forecast_date=timezone.now() + timedelta(days=day),
                predicted_temperature=round(uniform(25, 35), 1),
                predicted_min_temp=round(uniform(20, 25), 1),
                predicted_max_temp=round(uniform(30, 38), 1),
                predicted_rainfall=round(uniform(0, 50), 1),
                predicted_humidity=round(uniform(50, 80), 0),
                predicted_wind_speed=round(uniform(5, 20), 1),
                confidence_score=round(uniform(75, 95), 1),
                location=location,
                weather_condition=choice(weather_conditions),
                description=f"Forecast for {location}"
            )
    
    # Weekly forecasts (next 4 weeks)
    for week in range(1, 5):
        WeatherForecast.objects.create(
            forecast_type='weekly',
            forecast_date=timezone.now() + timedelta(weeks=week),
            predicted_temperature=round(uniform(25, 32), 1),
            predicted_min_temp=round(uniform(20, 25), 1),
            predicted_max_temp=round(uniform(30, 36), 1),
            predicted_rainfall=round(uniform(10, 100), 1),
            predicted_humidity=round(uniform(55, 75), 0),
            confidence_score=round(uniform(70, 90), 1),
            location='India',
            weather_condition=choice(weather_conditions),
            description=f"Week {week} forecast"
        )
    
    print(f"OK - Created {WeatherForecast.objects.count()} forecasts")


def create_agriculture_advisories():
    """Create sample agriculture advisories"""
    print("Creating agriculture advisories...")
    
    advisories = [
        {
            'crop_type': 'rice',
            'title': 'Optimal Rice Planting Season',
            'advisory_text': 'Current weather conditions are ideal for rice cultivation. Soil moisture is adequate.',
            'optimal_temp_min': 20.0,
            'optimal_temp_max': 35.0,
            'water_requirement': 'High - 1200-1500mm',
            'irrigation_advice': 'Maintain standing water of 2-3 inches during growth phase.',
            'pest_warning': 'Watch for stem borers and leaf folders. Use integrated pest management.',
            'priority': 5
        },
        {
            'crop_type': 'wheat',
            'title': 'Wheat Cultivation Advisory',
            'advisory_text': 'Prepare fields for wheat sowing. Current temperature range is suitable.',
            'optimal_temp_min': 15.0,
            'optimal_temp_max': 25.0,
            'water_requirement': 'Medium - 450-650mm',
            'irrigation_advice': 'Apply irrigation at crown root initiation and flowering stages.',
            'pest_warning': 'Monitor for aphids and rust diseases.',
            'priority': 4
        },
        {
            'crop_type': 'cotton',
            'title': 'Cotton Growing Recommendations',
            'advisory_text': 'Weather is favorable for cotton cultivation. Ensure proper drainage.',
            'optimal_temp_min': 21.0,
            'optimal_temp_max': 32.0,
            'water_requirement': 'Medium - 700-1300mm',
            'irrigation_advice': 'Avoid water stress during flowering and boll development.',
            'pest_warning': 'Bollworm infestation possible. Regular monitoring required.',
            'priority': 3
        },
    ]
    
    for advisory in advisories:
        AgricultureAdvisory.objects.create(
            **advisory,
            location='India',
            is_active=True
        )
    
    print(f"OK - Created {AgricultureAdvisory.objects.count()} agriculture advisories")


def create_policy_insights():
    """Create sample policy insights"""
    print("Creating policy insights...")
    
    insights = [
        {
            'category': 'emission_reduction',
            'title': 'Carbon Emission Reduction Strategy',
            'description': 'Implement comprehensive carbon pricing and renewable energy incentives to reduce emissions by 30% by 2030.',
            'potential_impact': 'Significant reduction in greenhouse gas emissions, improved air quality',
            'implementation_difficulty': 3,
            'estimated_cost': '$50-100 billion over 10 years',
            'action_items': '1. Carbon tax implementation\n2. Renewable energy subsidies\n3. Industrial emission standards',
            'timeline': '2025-2030',
            'stakeholders': 'Government, Industry, Environmental agencies',
            'is_featured': True,
            'priority': 5
        },
        {
            'category': 'renewable_energy',
            'title': 'Solar Energy Expansion Plan',
            'description': 'Accelerate solar power adoption through rooftop solar schemes and large-scale solar parks.',
            'potential_impact': 'Increase renewable energy share to 40% of total energy mix',
            'implementation_difficulty': 2,
            'estimated_cost': '$30-50 billion',
            'action_items': '1. Rooftop solar subsidies\n2. Solar park development\n3. Grid infrastructure upgrade',
            'timeline': '2025-2028',
            'stakeholders': 'Energy sector, State governments, Homeowners',
            'is_featured': True,
            'priority': 4
        },
        {
            'category': 'water_management',
            'title': 'Integrated Water Resource Management',
            'description': 'Improve water conservation and management through smart irrigation and rainwater harvesting.',
            'potential_impact': 'Reduce water wastage by 25%, improve agricultural productivity',
            'implementation_difficulty': 2,
            'estimated_cost': '$10-20 billion',
            'action_items': '1. Drip irrigation promotion\n2. Rainwater harvesting mandates\n3. Water pricing reform',
            'timeline': '2025-2027',
            'stakeholders': 'Agriculture sector, Municipal bodies, Farmers',
            'is_featured': False,
            'priority': 3
        },
    ]
    
    for insight in insights:
        PolicyInsight.objects.create(
            **insight,
            location='India'
        )
    
    print(f"OK - Created {PolicyInsight.objects.count()} policy insights")


def create_historical_data():
    """Create sample historical data"""
    print("Creating historical data...")
    
    # Create daily data for past 30 days
    for day in range(30):
        date = timezone.now() - timedelta(days=day)
        HistoricalData.objects.create(
            period_type='daily',
            period_start=date.replace(hour=0, minute=0, second=0),
            period_end=date.replace(hour=23, minute=59, second=59),
            avg_temperature=round(uniform(24, 32), 1),
            min_temperature=round(uniform(20, 25), 1),
            max_temperature=round(uniform(30, 38), 1),
            total_rainfall=round(uniform(0, 50), 1),
            avg_humidity=round(uniform(55, 75), 0),
            avg_co2=round(uniform(410, 420), 1),
            avg_wind_speed=round(uniform(5, 15), 1),
            avg_pressure=round(uniform(1000, 1015), 0),
            location='India'
        )
    
    print(f"OK - Created {HistoricalData.objects.count()} historical data records")


def main():
    """Main function to create all sample data"""
    print("\n" + "="*50)
    print("EcoPredict Sample Data Generator")
    print("="*50 + "\n")
    
    # Clear existing sample data
    print("Clearing existing sample data...")
    ClimateMetric.objects.filter(source='sample_data').delete()
    Alert.objects.all().delete()
    WeatherForecast.objects.all().delete()
    AgricultureAdvisory.objects.all().delete()
    PolicyInsight.objects.all().delete()
    HistoricalData.objects.all().delete()
    print("OK - Cleared\n")
    
    # Create new sample data
    create_climate_metrics()
    create_alerts()
    create_forecasts()
    create_agriculture_advisories()
    create_policy_insights()
    create_historical_data()
    
    print("\n" + "="*50)
    print("SUCCESS - Sample data created successfully!")
    print("="*50)
    print("\nDatabase Summary:")
    print(f"  - Climate Metrics: {ClimateMetric.objects.count()}")
    print(f"  - Alerts: {Alert.objects.count()}")
    print(f"  - Forecasts: {WeatherForecast.objects.count()}")
    print(f"  - Agriculture Advisories: {AgricultureAdvisory.objects.count()}")
    print(f"  - Policy Insights: {PolicyInsight.objects.count()}")
    print(f"  - Historical Records: {HistoricalData.objects.count()}")
    print("\nVisit http://localhost:3000/dashboard to see the data!\n")


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f"\nERROR: {e}")
        sys.exit(1)
