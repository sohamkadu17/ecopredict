import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Map, MapPin } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function ClimateTrends() {
  const [selectedMetric, setSelectedMetric] = useState<"temperature" | "rainfall" | "extremes">("temperature");
  const [viewMode, setViewMode] = useState<"chart" | "map">("chart");

  const metrics = [
    { id: "temperature", label: "Average Temperature (°C)", color: "#ef4444" },
    { id: "rainfall", label: "Annual Rainfall (mm)", color: "#3b82f6" },
    { id: "extremes", label: "Extreme Weather Events", color: "#eab308" },
  ];

  // Regional climate data for map
  const regionalData = [
    { 
      city: "Mumbai", 
      position: { top: "55%", left: "15%" },
      tempTrend: "+0.6°C/decade",
      rainfallTrend: "-8mm/year",
      extremesTrend: "+2.1 events/year",
      intensity: selectedMetric === "temperature" ? 0.85 : 0.65
    },
    { 
      city: "Delhi", 
      position: { top: "20%", left: "40%" },
      tempTrend: "+0.7°C/decade",
      rainfallTrend: "-10mm/year",
      intensity: selectedMetric === "temperature" ? 0.95 : 0.8
    },
    { 
      city: "Pune", 
      position: { top: "60%", left: "25%" },
      tempTrend: "+0.5°C/decade",
      rainfallTrend: "-5mm/year",
      intensity: selectedMetric === "temperature" ? 0.7 : 0.5
    },
    { 
      city: "Chennai", 
      position: { top: "75%", left: "48%" },
      tempTrend: "+0.4°C/decade",
      rainfallTrend: "+3mm/year",
      intensity: selectedMetric === "temperature" ? 0.6 : 0.3
    },
    { 
      city: "Kolkata", 
      position: { top: "38%", left: "70%" },
      tempTrend: "+0.5°C/decade",
      rainfallTrend: "-2mm/year",
      intensity: selectedMetric === "temperature" ? 0.7 : 0.4
    },
    { 
      city: "Bangalore", 
      position: { top: "70%", left: "38%" },
      tempTrend: "+0.6°C/decade",
      rainfallTrend: "-6mm/year",
      intensity: selectedMetric === "temperature" ? 0.8 : 0.6
    },
  ];

  // Generate historical data (2015-2024)
  const historicalData = Array.from({ length: 10 }, (_, i) => ({
    year: 2015 + i,
    historical: selectedMetric === "temperature" 
      ? 26 + Math.sin(i / 2) * 1.5 + i * 0.1
      : 800 + Math.sin(i / 3) * 100 + i * 5,
    predicted: null,
  }));

  // Generate predicted data (2025-2034)
  const predictedData = Array.from({ length: 10 }, (_, i) => ({
    year: 2025 + i,
    historical: null,
    predicted: selectedMetric === "temperature"
      ? 27.5 + Math.sin((i + 10) / 2) * 1.8 + i * 0.15
      : 850 + Math.sin((i + 10) / 3) * 120 - i * 8,
  }));

  const allData = [...historicalData, predictedData[0], ...predictedData.slice(1)];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Climate Trends & Comparison
        </h1>
        <p className="text-gray-400">Historical data vs AI-powered predictions</p>
      </div>

      {/* Metric & View Selector */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <Button
                key={metric.id}
                variant={selectedMetric === metric.id ? "default" : "outline"}
                onClick={() => setSelectedMetric(metric.id as "temperature" | "rainfall")}
                className={
                  selectedMetric === metric.id
                    ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white"
                    : "border-gray-700 text-gray-300"
                }
              >
                {metric.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewMode === "chart" ? "default" : "outline"}
              onClick={() => setViewMode("chart")}
              className={viewMode === "chart" ? "bg-gradient-to-r from-cyan-600 to-emerald-600" : "border-gray-700"}
            >
              Chart View
            </Button>
            <Button
              size="sm"
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              className={viewMode === "map" ? "bg-gradient-to-r from-cyan-600 to-emerald-600" : "border-gray-700"}
            >
              <Map className="mr-1" size={16} />
              Map View
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Visualization */}
      {viewMode === "chart" ? (
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <div className="mb-6">
            <h3 className="text-gray-300 mb-2">
              {metrics.find((m) => m.id === selectedMetric)?.label}
            </h3>
            <p className="text-sm text-gray-400">
              Comparing 10 years of historical data (2015-2024) with 10-year predictions (2025-2034)
            </p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={allData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#cbd5e1" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="historical"
                stroke="#06b6d4"
                strokeWidth={3}
                name="Historical Data"
                dot={{ fill: "#06b6d4", r: 4 }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#f97316"
                strokeWidth={3}
                strokeDasharray="5 5"
                name="AI Prediction"
                dot={{ fill: "#f97316", r: 4 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      ) : (
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 overflow-hidden">
          <div className="p-6 border-b border-cyan-900/30">
            <h3 className="text-gray-300 mb-2">Regional Climate Trends Map</h3>
            <p className="text-sm text-gray-400">
              {selectedMetric === "temperature" 
                ? "Temperature change trends across major Indian cities" 
                : "Rainfall pattern changes across major Indian cities"}
            </p>
          </div>
          <div className="relative h-[500px] md:h-[600px] bg-[#0a0e1a]">
            {/* Base Map */}
            <div className="absolute inset-0">
              {/* Simulated India Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-30"></div>
              
              {/* Grid overlay */}
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(100, 116, 139, 0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}></div>

              {/* Heat map overlay based on trends */}
              <div className="absolute inset-0 pointer-events-none">
                {regionalData.map((region, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-full blur-3xl"
                    style={{
                      top: region.position.top,
                      left: region.position.left,
                      width: '250px',
                      height: '250px',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: selectedMetric === "temperature" 
                        ? `rgba(239, 68, 68, ${region.intensity * 0.3})`
                        : `rgba(6, 182, 212, ${region.intensity * 0.3})`,
                    }}
                  ></div>
                ))}
              </div>

              {/* City Markers */}
              {regionalData.map((region, idx) => (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ top: region.position.top, left: region.position.left }}
                >
                  {/* Marker Pin */}
                  <div className="relative flex items-center justify-center">
                    <MapPin 
                      className={`${
                        selectedMetric === "temperature" ? "text-red-400" : "text-cyan-400"
                      } drop-shadow-lg`} 
                      size={32}
                      fill="currentColor"
                    />
                  </div>
                  
                  {/* Info Card on Hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-[#0f1629] border border-cyan-900/50 rounded-lg p-3 shadow-xl min-w-[180px]">
                      <h4 className="text-white mb-2">{region.city}</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Temperature:</span>
                          <span className="text-orange-400">{region.tempTrend}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rainfall:</span>
                          <span className="text-cyan-400">{region.rainfallTrend}</span>
                        </div>
                      </div>
                      {/* Badge for current metric */}
                      <Badge 
                        className={`mt-2 w-full justify-center ${
                          selectedMetric === "temperature" 
                            ? "bg-red-500/20 text-red-400 border-red-500/50" 
                            : "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
                        }`}
                      >
                        {selectedMetric === "temperature" ? region.tempTrend : region.rainfallTrend}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-[#0f1629]/90 backdrop-blur-sm border border-cyan-900/30 rounded-lg p-4">
                <h4 className="text-gray-300 text-sm mb-3">
                  {selectedMetric === "temperature" ? "Temperature Trend" : "Rainfall Trend"}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded ${
                      selectedMetric === "temperature" ? "bg-red-600" : "bg-cyan-600"
                    }`}></div>
                    <span className="text-xs text-gray-400">High Change</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded ${
                      selectedMetric === "temperature" ? "bg-orange-500" : "bg-cyan-500"
                    }`}></div>
                    <span className="text-xs text-gray-400">Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded ${
                      selectedMetric === "temperature" ? "bg-yellow-400" : "bg-blue-400"
                    }`}></div>
                    <span className="text-xs text-gray-400">Low Change</span>
                  </div>
                </div>
              </div>

              {/* Title Overlay */}
              <div className="absolute top-4 left-4 bg-[#0f1629]/90 backdrop-blur-sm border border-cyan-900/30 rounded-lg px-4 py-2">
                <p className="text-cyan-400 text-sm">Hover over cities for detailed trends</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <h4 className="text-cyan-400 mb-2">Current Trend</h4>
          <p className="text-2xl text-white mb-2">
            {selectedMetric === "temperature" ? "+0.5°C/decade" : "-5mm/year"}
          </p>
          <p className="text-sm text-gray-400">
            {selectedMetric === "temperature"
              ? "Temperatures steadily increasing"
              : "Rainfall patterns showing decline"}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <h4 className="text-emerald-400 mb-2">10-Year Prediction</h4>
          <p className="text-2xl text-white mb-2">
            {selectedMetric === "temperature" ? "29.2°C" : "780mm"}
          </p>
          <p className="text-sm text-gray-400">
            Predicted average by 2034
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <h4 className="text-orange-400 mb-2">Confidence Level</h4>
          <p className="text-2xl text-white mb-2">87%</p>
          <p className="text-sm text-gray-400">
            Based on 15 years of satellite data
          </p>
        </Card>
      </div>

      {/* Additional Context */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <h3 className="text-gray-300 mb-4">Key Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
            <p className="text-gray-400">
              Historical data shows a consistent warming trend over the past decade, with
              temperatures rising approximately 0.5°C every 10 years.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <p className="text-gray-400">
              Our AI models predict this trend will continue, with potential acceleration due
              to urbanization and global climate patterns.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <p className="text-gray-400">
              Rainfall patterns are expected to become more erratic, with potential for both
              extreme dry spells and intense precipitation events.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
