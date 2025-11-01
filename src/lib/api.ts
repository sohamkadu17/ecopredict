import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ===== Climate Metrics API =====
export const getClimateMetrics = () => api.get('/metrics/');
export const getCurrentMetrics = () => api.get('/metrics/current/');
export const getMetricStatistics = (type: string, days: number = 7) =>
  api.get('/metrics/statistics/', { params: { type, days } });

// ===== Historical Data API =====
export const getHistoricalData = () => api.get('/historical/');
export const getHistoricalTrends = (period: string = 'daily', days: number = 30) =>
  api.get('/historical/trends/', { params: { period, days } });

// ===== Weather Forecasts API =====
export const getWeatherForecasts = () => api.get('/forecasts/');
export const getDailyForecasts = () => api.get('/forecasts/daily/');
export const getWeeklyForecasts = () => api.get('/forecasts/weekly/');
export const getHourlyForecasts = () => api.get('/forecasts/hourly/');

// ===== Alerts API =====
export const getAlerts = (activeOnly: boolean = true) =>
  api.get('/alerts/', { params: { active_only: activeOnly } });
export const getActiveAlerts = () => api.get('/alerts/active/');
export const resolveAlert = (id: number) => api.post(`/alerts/${id}/resolve/`);

// ===== Agriculture Advisory API =====
export const getAgricultureAdvisories = () => api.get('/agriculture/');
export const getAdvisoriesByCrop = (crop: string) =>
  api.get('/agriculture/by_crop/', { params: { crop } });

// ===== Policy Insights API =====
export const getPolicyInsights = () => api.get('/policy/');
export const getFeaturedPolicyInsights = () => api.get('/policy/featured/');
export const getPolicyInsightsByCategory = (category: string) =>
  api.get('/policy/by_category/', { params: { category } });

// ===== Simulation API =====
export const getSimulations = () => api.get('/simulate/');
export const createSimulation = (data: {
  temperature_change: number;
  co2_change: number;
  rainfall_change: number;
  simulation_name?: string;
}) => api.post('/simulate/', data);

// ===== ChatBot API =====
export const getChatHistory = (sessionId: string) =>
  api.get('/chatbot/history/', { params: { session_id: sessionId } });
export const sendChatMessage = (data: {
  message: string;
  session_id?: string;
  user_id?: string;
}) => api.post('/chatbot/query/', data);

// ===== Aggregated Dashboard Data =====
export const getDashboardData = async () => {
  try {
    const [metrics, alerts, forecasts] = await Promise.all([
      getCurrentMetrics(),
      getActiveAlerts(),
      getDailyForecasts(),
    ]);

    return {
      metrics: metrics.data,
      alerts: alerts.data,
      forecasts: forecasts.data,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// ===== Risk Maps Data (Mock - replace with real endpoint if available) =====
export const getRiskMapData = async () => {
  // This would connect to a real risk assessment endpoint
  // For now, return mock data structure
  return {
    flood: { high: 23, medium: 45, low: 32 },
    drought: { high: 15, medium: 38, low: 47 },
    heatwave: { high: 31, medium: 42, low: 27 },
  };
};

// ===== Carbon Tracker Data =====
export const getCarbonData = async () => {
  try {
    const response = await getMetricStatistics('co2', 30);
    return response.data;
  } catch (error) {
    console.error('Error fetching carbon data:', error);
    throw error;
  }
};

export default api;
