import { Cloud, Droplets, Wind, AlertTriangle, Info, Sparkles, Loader2 } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchWeatherData, fetchAirQuality } from "../lib/weatherService";
import { Alert, AlertDescription } from "./ui/alert";

import { WeatherData } from '../lib/weatherService';

interface WeeklyForecastDay {
  day: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
}

interface DayPrediction {
  day: number;
  temperature: number;
  rainfall: number;
}

interface AqiItem {
  pollutant: string;
  value: number;
  color: string;
}

interface DashboardProps {
  onOpenExplain: () => void;
}

export function Dashboard({ onOpenExplain }: DashboardProps) {
  const [chartMode, setChartMode] = useState<"temperature" | "rainfall">("temperature");
  const [showSparkles, setShowSparkles] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [aqiData, setAqiData] = useState<{ list: Array<{ components: Record<string, number>; main: { aqi: number } }> } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSparkles(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Using Mumbai coordinates as default (you can make this dynamic later)
        const lat = 19.0760;
        const lon = 72.8777;
        
        const [weather, airQuality] = await Promise.all([
          fetchWeatherData(lat, lon),
          fetchAirQuality(lat, lon)
        ]);

        setWeatherData(weather);
        setAqiData(airQuality);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create mock prediction data
  const predictionData: DayPrediction[] = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    temperature: 28 + Math.sin(i / 5) * 6 + i * 0.1,
    rainfall: Math.max(0, Math.sin(i / 4) * 30 + 25 + Math.random() * 10),
  }));

  // Transform API data for charts
  const hourlyData = weatherData?.list?.slice(0, 8).map((item) => ({
    hour: new Date(item.dt * 1000).getHours() + 'h',
    temp: Math.round(item.main.temp),
    rain: Math.round(item.pop * 100),
  })) || [];

  const weeklyForecast: WeeklyForecastDay[] = weatherData?.list?.filter((_, index) => index % 8 === 0).slice(0, 7).map((item) => ({
    day: new Date(item.dt * 1000).toLocaleString('en-US', { weekday: 'short' }),
    temp: Math.round(item.main.temp),
    condition: item.weather[0].main.toLowerCase(),
    high: Math.round(item.main.temp_max),
    low: Math.round(item.main.temp_min),
  })) || [];

  const currentAqiComponents = aqiData?.list?.[0]?.components || {};
  const aqiItems: AqiItem[] = [
    { pollutant: "PM2.5", value: currentAqiComponents.pm2_5 || 0, color: "#fbbf24" },
    { pollutant: "O₃", value: currentAqiComponents.o3 || 0, color: "#34d399" },
    { pollutant: "NO₂", value: currentAqiComponents.no2 || 0, color: "#fb923c" },
    { pollutant: "SO₂", value: currentAqiComponents.so2 || 0, color: "#34d399" },
    { pollutant: "CO", value: currentAqiComponents.co || 0, color: "#fbbf24" },
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return "☀️";
      case 'rain':
        return "🌧️";
      case 'clouds':
        return "⛅";
      case 'snow':
        return "❄️";
      default:
        return "⛅";
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return { color: "from-green-500 to-emerald-500", text: "Good", ring: "border-green-500" };
    if (aqi <= 100) return { color: "from-yellow-500 to-amber-500", text: "Moderate", ring: "border-yellow-500" };
    return { color: "from-red-500 to-orange-500", text: "Unhealthy", ring: "border-red-500" };
  };

  const currentAQI = (aqiData?.list?.[0]?.main?.aqi ?? 0) * 20; // Converting 1-5 scale to 0-100
  const aqiStatus = getAQIColor(currentAQI);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 relative">
      {/* Sparkle Animation on Entry */}
      {showSparkles && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              initial={{
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
            >
              <Sparkles className="text-cyan-400" size={24} />
            </motion.div>
          ))}
        </>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Climate Dashboard
          </h1>
          <p className="text-gray-400">Pune, India • Real-time Monitoring & Predictions</p>
        </div>
        <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-600/50 w-fit">
          Last updated: 2 mins ago
        </Badge>
      </motion.div>

      {/* Main Weather Card & AQI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather */}
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6 col-span-1 lg:col-span-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-6xl">☀️</div>
              <div>
                <div className="text-5xl text-white">{Math.round(weatherData?.list?.[0]?.main?.temp || 0)}°C</div>
                <p className="text-gray-400 mt-2">Feels like {Math.round(weatherData?.list?.[0]?.main?.feels_like || 0)}°C</p>
                <p className="text-cyan-400 mt-1">{weatherData?.list?.[0]?.weather?.[0]?.main || 'Loading...'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 md:mt-0">
              <div className="flex items-center space-x-2">
                <Droplets className="text-cyan-400" size={20} />
                <div>
                  <p className="text-xs text-gray-400">Humidity</p>
                  <p className="text-white">{weatherData?.list?.[0]?.main?.humidity || 0}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="text-emerald-400" size={20} />
                <div>
                  <p className="text-xs text-gray-400">Wind</p>
                  <p className="text-white">{Math.round((weatherData?.list?.[0]?.wind?.speed || 0) * 3.6)} km/h</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* AQI Card */}
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <h3 className="text-gray-300 mb-4">Air Quality Index</h3>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full border-8 ${aqiStatus.ring} flex items-center justify-center bg-gradient-to-br ${aqiStatus.color} bg-opacity-10`}>
                <div className="text-center">
                  <div className="text-3xl text-white">{currentAQI}</div>
                  <div className="text-xs text-gray-300">{aqiStatus.text}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Cloud size={16} />
            <span>Moderate air quality</span>
          </div>
        </Card>
      </div>

      {/* Hourly Forecast */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <h3 className="text-gray-300 mb-4">24-Hour Forecast</h3>
        <div className="overflow-x-auto">
          <ResponsiveContainer width="100%" height={200} minWidth={600}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
                labelStyle={{ color: "#cbd5e1" }}
              />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#06b6d4"
                fill="url(#tempGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 7-Day Forecast */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <h3 className="text-gray-300 mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {weeklyForecast.map((day) => (
            <div
              key={day.day}
              className="bg-[#1a2332] rounded-lg p-4 text-center hover:bg-[#1e2838] transition-colors"
            >
              <p className="text-gray-400 text-sm mb-2">{day.day}</p>
              <div className="text-3xl mb-2">{getWeatherIcon(day.condition)}</div>
              <p className="text-white mb-1">{day.temp}°C</p>
              <p className="text-xs text-gray-500">
                {day.high}° / {day.low}°
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature & Rainfall Prediction */}
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300">30-Day Prediction</h3>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={chartMode === "temperature" ? "default" : "outline"}
                onClick={() => setChartMode("temperature")}
                className={chartMode === "temperature" ? "bg-gradient-to-r from-cyan-600 to-emerald-600" : ""}
              >
                Temperature
              </Button>
              <Button
                size="sm"
                variant={chartMode === "rainfall" ? "default" : "outline"}
                onClick={() => setChartMode("rainfall")}
                className={chartMode === "rainfall" ? "bg-gradient-to-r from-cyan-600 to-emerald-600" : ""}
              >
                Rainfall
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onOpenExplain}
                className="text-cyan-400 hover:text-cyan-300"
              >
                <Info size={16} className="mr-1" />
                Why?
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
                labelStyle={{ color: "#cbd5e1" }}
              />
              <Line
                type="monotone"
                dataKey={chartMode}
                stroke={chartMode === "temperature" ? "#f97316" : "#06b6d4"}
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* AQI Pollutants */}
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <h3 className="text-gray-300 mb-4">Air Quality Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={aqiItems}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="pollutant" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }}
                labelStyle={{ color: "#cbd5e1" }}
              />
              <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Early Warning Panel */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="text-yellow-500" />
          <h3 className="text-gray-300">Early Warning System</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-400">All Clear</span>
            </div>
            <p className="text-sm text-gray-400">No immediate climate threats detected</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-400">Moderate Heatwave Alert</span>
            </div>
            <p className="text-sm text-gray-400">Expected in 5-7 days. Stay hydrated.</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-400">High AQI Alert</span>
            </div>
            <p className="text-sm text-gray-400">Pollution levels may increase tomorrow</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
