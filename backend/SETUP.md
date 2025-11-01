# EcoPredict Backend Setup Guide

## 📋 Prerequisites

- Python 3.11 or higher
- Pipenv (Python package manager)
- Git

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Navigate to backend directory
cd backend

# Install all Python packages
pipenv install

# Activate virtual environment
pipenv shell
```

### 2. Environment Configuration

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your configurations (optional for development)
```

### 3. Database Setup

```bash
# Create database migrations
python manage.py makemigrations

# Apply migrations to create database tables
python manage.py migrate

# Create superuser for admin access (optional)
python manage.py createsuperuser
```

### 4. Run Development Server

```bash
# Start the Django development server
python manage.py runserver

# Server will be available at: http://localhost:8000
# Admin panel: http://localhost:8000/admin
# API endpoints: http://localhost:8000/api/
```

## 📚 API Endpoints

### Base URL
```
http://localhost:8000/api/
```

### Available Endpoints

#### Climate Metrics
- `GET /api/metrics/` - List all metrics
- `GET /api/metrics/current/` - Get current metrics for all types
- `GET /api/metrics/statistics/?type=temperature&days=7` - Get statistics
- `POST /api/metrics/` - Create new metric
- `GET /api/metrics/{id}/` - Get specific metric
- `PUT /api/metrics/{id}/` - Update metric
- `DELETE /api/metrics/{id}/` - Delete metric

#### Historical Data
- `GET /api/historical/` - List historical data
- `GET /api/historical/trends/?period=daily&days=30` - Get trend data
- `POST /api/historical/` - Create historical record

#### Weather Forecasts
- `GET /api/forecasts/` - List all forecasts
- `GET /api/forecasts/daily/` - Get daily forecasts (next 7 days)
- `GET /api/forecasts/weekly/` - Get weekly forecasts
- `GET /api/forecasts/hourly/` - Get hourly forecasts (next 24 hours)
- `POST /api/forecasts/` - Create new forecast

#### Alerts
- `GET /api/alerts/` - List all alerts (active by default)
- `GET /api/alerts/active/` - Get active alerts only
- `POST /api/alerts/` - Create new alert
- `POST /api/alerts/{id}/resolve/` - Mark alert as resolved
- `GET /api/alerts/?active_only=false` - Get all alerts including inactive

#### Agriculture Advisory
- `GET /api/agriculture/` - List all advisories
- `GET /api/agriculture/by_crop/?crop=wheat` - Get advisories for specific crop
- `POST /api/agriculture/` - Create new advisory

#### Policy Insights
- `GET /api/policy/` - List all policy insights
- `GET /api/policy/featured/` - Get featured insights
- `GET /api/policy/by_category/?category=emission_reduction` - Filter by category
- `POST /api/policy/` - Create new policy insight

#### Climate Simulations
- `GET /api/simulate/` - List all simulations
- `POST /api/simulate/` - Run new simulation
  ```json
  {
    "temperature_change": 2.5,
    "co2_change": 100,
    "rainfall_change": -15,
    "simulation_name": "High Emission Scenario"
  }
  ```
- `GET /api/simulate/{id}/` - Get simulation results

#### Chatbot
- `POST /api/chatbot/query/` - Send message to chatbot
  ```json
  {
    "message": "What is the current temperature?",
    "session_id": "optional-session-id",
    "user_id": "optional-user-id"
  }
  ```
- `GET /api/chatbot/history/?session_id=xxx` - Get chat history

## 🗄️ Database Models

### ClimateMetric
Stores real-time climate measurements (temperature, rainfall, CO2, humidity, wind speed, pressure).

### HistoricalData
Aggregated historical climate data (hourly, daily, weekly, monthly, yearly).

### WeatherForecast
Weather and climate forecasts (hourly, daily, weekly).

### Alert
Weather alerts and warnings with severity levels.

### AgricultureAdvisory
Crop-specific farming recommendations.

### PolicyInsight
Policy recommendations for climate action.

### Simulation
Climate scenario simulation results.

### ChatMessage
Chatbot conversation history.

## 🔧 Useful Commands

### Database Management
```bash
# Create new migrations after model changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Reset database (WARNING: deletes all data)
python manage.py flush

# Create database backup
python manage.py dumpdata > backup.json

# Load data from backup
python manage.py loaddata backup.json
```

### Admin Commands
```bash
# Create superuser
python manage.py createsuperuser

# Collect static files (for production)
python manage.py collectstatic

# Check for project issues
python manage.py check
```

### Development
```bash
# Start interactive shell
python manage.py shell

# Run tests
python manage.py test

# Run specific app tests
python manage.py test api
```

## 📦 Installed Packages

- **Django 5.2.7** - Web framework
- **Django REST Framework** - REST API framework
- **django-cors-headers** - CORS support
- **django-filter** - Advanced filtering
- **python-decouple** - Environment configuration
- **Pillow** - Image processing

## 🔐 Security Notes

### Development
- DEBUG is set to True
- CORS allows all origins
- AllowAny permissions on API endpoints

### Production Checklist
- [ ] Set DEBUG = False
- [ ] Configure specific ALLOWED_HOSTS
- [ ] Set CORS_ALLOW_ALL_ORIGINS = False
- [ ] Configure specific CORS_ALLOWED_ORIGINS
- [ ] Update SECRET_KEY
- [ ] Use PostgreSQL instead of SQLite
- [ ] Configure proper permissions on API endpoints
- [ ] Enable HTTPS
- [ ] Set up proper logging
- [ ] Configure static/media file serving
- [ ] Set up database backups

## 🧪 Testing

### Run all tests
```bash
python manage.py test
```

### Run with coverage
```bash
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html
```

## 📝 API Documentation

After starting the server, visit:
- **Browsable API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

## 🐛 Troubleshooting

### Common Issues

**Issue**: `ModuleNotFoundError: No module named 'rest_framework'`
```bash
# Solution: Install dependencies
pipenv install
```

**Issue**: `django.db.utils.OperationalError: no such table`
```bash
# Solution: Run migrations
python manage.py migrate
```

**Issue**: `CORS errors in frontend`
```bash
# Solution: Check CORS configuration in settings.py
# Ensure corsheaders is in INSTALLED_APPS and middleware
```

**Issue**: `Port already in use`
```bash
# Solution: Use a different port
python manage.py runserver 8001
```

## 📚 Next Steps

1. **Populate Sample Data**: Create sample climate data for testing
2. **Integrate ML Models**: Add actual prediction models
3. **External APIs**: Integrate weather data providers
4. **Authentication**: Add user authentication and permissions
5. **Rate Limiting**: Implement API rate limiting
6. **Caching**: Add Redis caching for performance
7. **Celery**: Set up background tasks for predictions
8. **Documentation**: Generate API documentation with drf-yasg

## 🤝 Contributing

When making changes:
1. Create new branch
2. Make migrations: `python manage.py makemigrations`
3. Apply migrations: `python manage.py migrate`
4. Write tests for new features
5. Run tests: `python manage.py test`
6. Commit changes with clear messages

## 📞 Support

For issues or questions, please check:
- Django documentation: https://docs.djangoproject.com/
- DRF documentation: https://www.django-rest-framework.org/
- Project README: ../README.md
