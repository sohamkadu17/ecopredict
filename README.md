# 🌍 EcoPredict - AI-Powered Climate Intelligence Platform

![EcoPredict Banner](https://img.shields.io/badge/Climate-Intelligence-green?style=for-the-badge)
![Django](https://img.shields.io/badge/Django-5.2.7-darkgreen?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**EcoPredict** is an advanced AI-powered climate intelligence platform that provides accurate, real-time, and visual climate forecasts for everyone. The platform harnesses the power of artificial intelligence and machine learning to understand and predict climate patterns, offering actionable insights for agriculture, policy-making, and environmental sustainability.

### Vision

To democratize climate intelligence by making advanced predictive climate modeling accessible to farmers, policymakers, researchers, and citizens worldwide.

### Mission

- Provide accurate real-time climate analytics
- Deliver AI-powered predictive forecasts
- Offer actionable insights for sustainable practices
- Enable early warning systems for extreme weather events
- Support data-driven decision making for climate adaptation

## ✨ Features

### 🎯 Core Features

#### 1. **Real-Time Climate Dashboard**
- Live monitoring of temperature, rainfall, and CO2 emissions
- Interactive data visualizations and charts
- Historical trend analysis
- Multi-metric comparison views
- Customizable time ranges (hourly, daily, weekly, monthly, yearly)

#### 2. **AI-Powered Predictive Forecasting**
- Daily weather forecasts with hourly breakdowns
- Weekly climate predictions
- Long-term climate trend projections
- Confidence intervals and accuracy metrics
- Machine learning-based anomaly detection

#### 3. **Agriculture Advisory System**
- Crop-specific recommendations based on climate data
- Optimal planting and harvesting schedules
- Irrigation and water management advice
- Pest and disease risk assessments
- Soil health monitoring integration

#### 4. **Policy Insights & Recommendations**
- Data-driven policy recommendations
- Carbon emission tracking and reduction strategies
- Sustainability impact assessments
- Compliance monitoring tools
- Regional climate action plans

#### 5. **Climate Scenario Simulator**
- Interactive parameter adjustment (temperature, CO2, rainfall)
- Real-time prediction outcomes
- "What-if" scenario modeling
- Impact visualization on agriculture and environment
- Comparative analysis tools

#### 6. **Intelligent AI Chatbot**
- Natural language query processing
- Climate pattern explanations
- Personalized recommendations
- Historical data insights
- Context-aware responses

#### 7. **Early Warning System**
- Extreme weather alerts
- Risk assessment notifications
- Severity-based categorization (Critical, Warning, Info)
- Multi-channel alert delivery
- Automated alert generation

## 🛠️ Technology Stack

### Frontend
- **Framework**: Vite 6.3.5 + React 18
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4.1.9
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Package Manager**: npm

### Backend
- **Framework**: Django 5.2.7
- **API**: Django REST Framework 3.x
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **Language**: Python 3.11
- **Package Manager**: Pipenv
- **Authentication**: JWT / Session-based
- **CORS**: django-cors-headers

### AI/ML Stack (Planned)
- **ML Framework**: TensorFlow / PyTorch
- **Data Processing**: Pandas, NumPy
- **Visualization**: Matplotlib, Seaborn
- **Climate Models**: LSTM, ARIMA, Prophet
- **NLP**: Transformers, LangChain (Chatbot)

### DevOps & Deployment
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend) / Railway/Heroku (Backend)
- **Monitoring**: Sentry
- **Analytics**: Vercel Analytics

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Web App    │  │  Mobile App  │  │  Dashboard   │  │
│  │   (Vite)     │  │   (Future)   │  │   (Admin)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕ HTTPS/REST API
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Django REST Framework API               │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  │  │
│  │  │ Auth   │  │Metrics │  │Forecast│  │Insights│  │  │
│  │  │ API    │  │  API   │  │  API   │  │  API   │  │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                   Business Logic                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────────────┐  │
│  │  Django   │  │   ML      │  │   External APIs   │  │
│  │  Models   │  │  Models   │  │  (Weather, etc.)  │  │
│  └───────────┘  └───────────┘  └───────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  PostgreSQL  │  │    Redis     │  │   S3/Cloud   │  │
│  │  (Primary)   │  │   (Cache)    │  │   Storage    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Request** → Frontend (Vite + React)
2. **API Call** → Backend (Django REST Framework) via Axios
3. **Business Logic** → Models/Services/ML Processing
4. **Data Retrieval** → Database/Cache/External APIs
5. **Response** → Serialization → JSON
6. **Rendering** → Frontend Components → User Interface

## 📁 Project Structure

```
ecopredict/
├── 📁 src/                          # Vite React source
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   ├── index.css                    # Global styles
│   ├── vite-env.d.ts                # Vite types
│   │
│   ├── 📁 components/               # React components
│   │   ├── 📁 ui/                   # shadcn/ui components
│   │   ├── LandingPage.tsx          # Landing page
│   │   ├── Dashboard.tsx            # Dashboard
│   │   ├── RiskMaps.tsx             # Risk maps
│   │   ├── ClimateTrends.tsx        # Climate trends
│   │   ├── CarbonTracker.tsx        # Carbon tracker
│   │   ├── AgricultureMode.tsx      # Agriculture mode
│   │   ├── ScenarioSimulator.tsx    # Scenario simulator
│   │   ├── ChatBot.tsx              # AI chatbot
│   │   ├── Navbar.tsx               # Navigation
│   │   └── ExplainModal.tsx         # Explanation modal
│   │
│   ├── 📁 lib/                      # Utilities
│   │   └── api.ts                   # API client (Axios)
│   │
│   └── 📁 styles/                   # Additional styles
│       └── globals.css              # Global CSS
│
├── 📁 backend/                      # Django backend
│   ├── 📁 backend/                  # Django project
│   │   ├── settings.py              # Project settings
│   │   ├── urls.py                  # Root URL config
│   │   ├── wsgi.py                  # WSGI config
│   │   └── asgi.py                  # ASGI config
│   │
│   ├── 📁 api/                      # Main API app
│   │   ├── models.py                # Data models
│   │   ├── serializers.py           # DRF serializers
│   │   ├── views.py                 # API views
│   │   ├── urls.py                  # API routing
│   │   ├── admin.py                 # Admin config
│   │   └── tests.py                 # Unit tests
│   │
│   ├── manage.py                    # Django CLI
│   ├── db.sqlite3                   # SQLite database
│   └── add_sample_data.py           # Sample data script
│
├── index.html                       # HTML template
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript config
├── tsconfig.node.json               # Node TypeScript config
├── tailwind.config.js               # Tailwind config
├── postcss.config.mjs               # PostCSS config
├── package.json                     # Node dependencies
├── .env                             # Environment variables
├── Pipfile                          # Python dependencies
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Pipenv** (Python package manager)
- **Git**

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecopredict.git
cd ecopredict
```

#### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

#### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install django djangorestframework django-cors-headers django-filter

# Apply migrations
python manage.py migrate

# Load sample data (optional)
python add_sample_data.py

# Create superuser (optional)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Environment Variables

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
```

#### Backend (backend/.env - Optional)

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000

# External APIs (when integrated)
WEATHER_API_KEY=your-api-key
OPENAI_API_KEY=your-api-key
```

## 📚 API Documentation

### Base URL

```
Development: http://localhost:8000/api
Production: https://api.ecopredict.com/api
```

### Authentication

```http
POST /api/auth/login/
POST /api/auth/logout/
POST /api/auth/register/
GET  /api/auth/user/
```

### Climate Metrics

```http
GET  /api/metrics/                    # Current metrics
GET  /api/metrics/history/            # Historical data
GET  /api/metrics/statistics/         # Aggregate stats
```

### Forecasts

```http
GET  /api/forecasts/daily/            # Daily forecasts
GET  /api/forecasts/weekly/           # Weekly forecasts
GET  /api/forecasts/hourly/           # Hourly forecasts
GET  /api/forecasts/{id}/             # Specific forecast
```

### Insights

```http
GET  /api/insights/agriculture/       # Agriculture advisory
GET  /api/insights/policy/            # Policy insights
GET  /api/insights/recommendations/   # Personalized tips
```

### Alerts

```http
GET  /api/alerts/                     # Active alerts
GET  /api/alerts/{id}/                # Specific alert
POST /api/alerts/subscribe/           # Subscribe to alerts
```

### Simulator

```http
POST /api/simulate/                   # Run simulation
GET  /api/simulate/{id}/              # Get results
```

### Chatbot

```http
POST /api/chatbot/query/              # Send message
GET  /api/chatbot/history/            # Chat history
```

## 🗺️ Development Roadmap

### Phase 1: Foundation (Current)
- [x] Project setup and architecture
- [x] Frontend UI development
- [x] Django backend initialization
- [ ] Database models design
- [ ] REST API implementation
- [ ] CORS and security configuration

### Phase 2: Core Features
- [ ] Real-time climate metrics API
- [ ] Historical data integration
- [ ] Frontend-backend integration
- [ ] Data visualization
- [ ] Basic forecasting logic

### Phase 3: AI/ML Integration
- [ ] ML model development (LSTM/ARIMA)
- [ ] Training pipeline setup
- [ ] Prediction API implementation
- [ ] Model optimization
- [ ] Accuracy monitoring

### Phase 4: Advanced Features
- [ ] Chatbot implementation (NLP)
- [ ] Scenario simulator
- [ ] Agriculture advisory system
- [ ] Policy insights engine
- [ ] Alert system

### Phase 5: Enhancement
- [ ] Performance optimization
- [ ] Caching layer (Redis)
- [ ] Mobile responsive improvements
- [ ] PWA capabilities
- [ ] Offline support

### Phase 6: Production
- [ ] Production database migration (PostgreSQL)
- [ ] Security hardening
- [ ] Load testing
- [ ] Deployment automation
- [ ] Monitoring and logging

### Phase 7: Future
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Regional customization
- [ ] Premium features
- [ ] API marketplace

## 🧪 Testing

### Frontend Tests

```bash
# Run tests (when configured)
npm test

# Run with coverage
npm test:coverage
```

### Backend Tests

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test api

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- **Frontend**: Follow ESLint and Prettier configurations
- **Backend**: Follow PEP 8 style guide
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: [Your Name]
- **Frontend Development**: [Team Members]
- **Backend Development**: [Team Members]
- **ML Engineering**: [Team Members]
- **UI/UX Design**: [Team Members]

## 📞 Contact

- **Email**: contact@ecopredict.com
- **Website**: https://ecopredict.com
- **GitHub**: https://github.com/yourusername/ecopredict
- **Twitter**: @EcoPredict

## 🙏 Acknowledgments

- Climate data provided by [Weather APIs]
- UI components by shadcn/ui
- Icons by Lucide React
- Inspiration from climate science community

---

<div align="center">
  <strong>Built with ❤️ for a sustainable future</strong>
  <br>
  <sub>Making climate intelligence accessible to everyone</sub>
</div>
