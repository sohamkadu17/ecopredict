import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Droplets, Sun, Sprout, Calendar } from "lucide-react";

export function AgricultureMode() {
  const crops = [
    { name: "Wheat", sowStart: 2, sowEnd: 4, color: "from-amber-500 to-yellow-500" },
    { name: "Rice", sowStart: 5, sowEnd: 7, color: "from-green-500 to-emerald-500" },
    { name: "Cotton", sowStart: 4, sowEnd: 6, color: "from-blue-400 to-cyan-400" },
    { name: "Sugarcane", sowStart: 1, sowEnd: 3, color: "from-purple-500 to-pink-500" },
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Agriculture Dashboard
        </h1>
        <p className="text-gray-400">Smart farming insights powered by climate AI</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Soil Moisture */}
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <Droplets className="text-cyan-400" size={32} />
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Optimal</Badge>
          </div>
          <h3 className="text-gray-300 mb-2">Soil Moisture</h3>
          <p className="text-3xl text-white mb-2">68%</p>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: "68%" }}></div>
          </div>
          <p className="text-sm text-gray-400">Ideal for current crops</p>
        </Card>

        {/* Sun Exposure */}
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <Sun className="text-yellow-400" size={32} />
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Good</Badge>
          </div>
          <h3 className="text-gray-300 mb-2">Sun Exposure</h3>
          <p className="text-3xl text-white mb-2">8.5 hrs</p>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: "85%" }}></div>
          </div>
          <p className="text-sm text-gray-400">Average daily sunlight</p>
        </Card>

        {/* Irrigation Advisory */}
        <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <Sprout className="text-emerald-400" size={32} />
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Action Needed</Badge>
          </div>
          <h3 className="text-gray-300 mb-2">Irrigation Advisory</h3>
          <p className="text-3xl text-white mb-2">2 Days</p>
          <p className="text-sm text-gray-400 mb-2">Next watering recommended</p>
          <p className="text-xs text-cyan-400">Based on weather forecast & soil data</p>
        </Card>
      </div>

      {/* Crop Sowing Calendar */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="text-cyan-400" />
          <h3 className="text-gray-300">Crop Sowing Calendar</h3>
        </div>

        <div className="space-y-4">
          {crops.map((crop) => (
            <div key={crop.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{crop.name}</span>
                <span className="text-sm text-gray-500">
                  {months[crop.sowStart - 1]} - {months[crop.sowEnd - 1]}
                </span>
              </div>
              <div className="relative h-8 bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex">
                  {months.map((month, idx) => (
                    <div
                      key={month}
                      className="flex-1 border-r border-gray-700 last:border-r-0 flex items-center justify-center text-[10px] text-gray-600"
                    >
                      {month}
                    </div>
                  ))}
                </div>
                <div
                  className={`absolute top-0 h-full bg-gradient-to-r ${crop.color} opacity-70 rounded transition-all`}
                  style={{
                    left: `${((crop.sowStart - 1) / 12) * 100}%`,
                    width: `${((crop.sowEnd - crop.sowStart + 1) / 12) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weather Impact on Crops */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <h3 className="text-gray-300 mb-4">7-Day Farming Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-400 mb-2">Favorable Conditions</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Moderate temperatures ideal for wheat growth
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                No heavy rainfall expected - safe for harvesting
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Low wind speeds suitable for pesticide application
              </li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="text-yellow-400 mb-2">Alerts & Recommendations</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">⚠</span>
                Possible heatwave next week - increase irrigation
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">⚠</span>
                Light frost risk on Thursday morning
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">⚠</span>
                AQI may affect crop quality - monitor closely
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Smart Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border-cyan-500/30 p-4">
          <h4 className="text-cyan-400 text-sm mb-2">Best Planting Date</h4>
          <p className="text-xl text-white">Mar 15, 2025</p>
          <p className="text-xs text-gray-400 mt-1">For summer crops</p>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-600/10 to-green-600/10 border-emerald-500/30 p-4">
          <h4 className="text-emerald-400 text-sm mb-2">Fertilizer Alert</h4>
          <p className="text-xl text-white">Due in 5 days</p>
          <p className="text-xs text-gray-400 mt-1">Nitrogen-rich mix</p>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border-purple-500/30 p-4">
          <h4 className="text-purple-400 text-sm mb-2">Pest Risk</h4>
          <p className="text-xl text-white">Low</p>
          <p className="text-xs text-gray-400 mt-1">Current conditions</p>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600/10 to-red-600/10 border-orange-500/30 p-4">
          <h4 className="text-orange-400 text-sm mb-2">Harvest Window</h4>
          <p className="text-xl text-white">Apr 20-25</p>
          <p className="text-xs text-gray-400 mt-1">Optimal weather</p>
        </Card>
      </div>
    </div>
  );
}
