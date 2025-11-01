import { Card } from "./ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Factory, Car, Zap, Home } from "lucide-react";

export function CarbonTracker() {
  // CO2 emissions by source
  const emissionsData = [
    { name: "Industry", value: 35, color: "#ef4444" },
    { name: "Transport", value: 28, color: "#f59e0b" },
    { name: "Energy", value: 25, color: "#eab308" },
    { name: "Residential", value: 12, color: "#22c55e" },
  ];

  // Pollution contribution by sector
  const pollutionData = [
    { sector: "Manufacturing", pm25: 45, nox: 38, so2: 42 },
    { sector: "Vehicles", pm25: 32, nox: 55, so2: 18 },
    { sector: "Power Plants", pm25: 28, nox: 48, so2: 65 },
    { sector: "Construction", pm25: 38, nox: 22, so2: 15 },
    { sector: "Agriculture", pm25: 15, nox: 12, so2: 8 },
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#eab308", "#22c55e"];

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Carbon & Pollution Tracker
        </h1>
        <p className="text-gray-400">Monitor emissions and pollution levels by sector</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-600/10 to-orange-600/10 border-red-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <Factory className="text-red-400" size={24} />
            <TrendingUp className="text-red-400" size={20} />
          </div>
          <h4 className="text-gray-300 text-sm mb-1">Industry</h4>
          <p className="text-2xl text-white">35%</p>
          <p className="text-xs text-gray-400 mt-1">Largest contributor</p>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600/10 to-yellow-600/10 border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <Car className="text-orange-400" size={24} />
            <TrendingUp className="text-orange-400" size={20} />
          </div>
          <h4 className="text-gray-300 text-sm mb-1">Transport</h4>
          <p className="text-2xl text-white">28%</p>
          <p className="text-xs text-gray-400 mt-1">High NOx levels</p>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border-yellow-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <Zap className="text-yellow-400" size={24} />
            <TrendingUp className="text-yellow-400" size={20} />
          </div>
          <h4 className="text-gray-300 text-sm mb-1">Energy</h4>
          <p className="text-2xl text-white">25%</p>
          <p className="text-xs text-gray-400 mt-1">Coal-based power</p>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 border-green-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <Home className="text-green-400" size={24} />
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <h4 className="text-gray-300 text-sm mb-1">Residential</h4>
          <p className="text-2xl text-white">12%</p>
          <p className="text-xs text-gray-400 mt-1">Lowest impact</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - CO2 Sources */}
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <h3 className="text-gray-300 mb-4">CO₂ Emissions by Source</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={emissionsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {emissionsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart - Pollution by Sector */}
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <h3 className="text-gray-300 mb-4">Pollution Contribution by Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pollutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="sector" stroke="#64748b" angle={-15} textAnchor="end" height={80} />
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
              <Bar dataKey="pm25" fill="#06b6d4" name="PM2.5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="nox" fill="#f59e0b" name="NOx" radius={[4, 4, 0, 0]} />
              <Bar dataKey="so2" fill="#ef4444" name="SO₂" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <h3 className="text-gray-300 mb-4">Sector Analysis</h3>
        <div className="space-y-4">
          {emissionsData.map((sector, idx) => (
            <div key={sector.name} className="flex items-center justify-between p-4 bg-[#1a2332] rounded-lg">
              <div className="flex items-center space-x-4">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[idx] }}
                ></div>
                <div>
                  <h4 className="text-white">{sector.name}</h4>
                  <p className="text-sm text-gray-400">
                    {sector.name === "Industry" && "Manufacturing, mining, and heavy machinery"}
                    {sector.name === "Transport" && "Vehicles, aviation, and shipping"}
                    {sector.name === "Energy" && "Power generation and distribution"}
                    {sector.name === "Residential" && "Homes, buildings, and services"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl text-white">{sector.value}%</p>
                <p className="text-sm text-gray-400">of total</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <h3 className="text-gray-300 mb-4">Reduction Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <h4 className="text-cyan-400 mb-2">Short-term Actions</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2">•</span>
                Implement stricter vehicle emission standards
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2">•</span>
                Promote public transportation usage
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2">•</span>
                Encourage industrial emission monitoring
              </li>
            </ul>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <h4 className="text-emerald-400 mb-2">Long-term Goals</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Transition to renewable energy sources
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Invest in green infrastructure
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Support electric vehicle adoption
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
