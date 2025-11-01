from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'metrics', views.ClimateMetricViewSet, basename='climatemetric')
router.register(r'historical', views.HistoricalDataViewSet, basename='historicaldata')
router.register(r'forecasts', views.WeatherForecastViewSet, basename='weatherforecast')
router.register(r'alerts', views.AlertViewSet, basename='alert')
router.register(r'agriculture', views.AgricultureAdvisoryViewSet, basename='agricultureadvisory')
router.register(r'policy', views.PolicyInsightViewSet, basename='policyinsight')
router.register(r'simulate', views.SimulationViewSet, basename='simulation')
router.register(r'chatbot', views.ChatMessageViewSet, basename='chatmessage')

urlpatterns = [
    # API Overview
    path('', views.api_overview, name='api-overview'),
    
    # Legacy dashboard endpoint
    path('dashboard/', views.dashboard, name='dashboard'),
    
    # Router URLs - includes all viewset endpoints
    path('', include(router.urls)),
]
