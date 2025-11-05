import { Search, Layers, AlertTriangle } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { riskAssessmentData, regionalClimateData } from "../lib/climateData";

export function RiskMaps() {
  const [activeOverlay, setActiveOverlay] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const overlays = [
    { id: "flood", label: "Flood Risk", color: "from-blue-500 to-cyan-500", data: riskAssessmentData.flood },
    { id: "drought", label: "Drought Zones", color: "from-yellow-500 to-orange-500", data: riskAssessmentData.drought },
    { id: "heatwave", label: "Heatwave Intensity", color: "from-red-500 to-pink-500", data: riskAssessmentData.heatwave },
  ];

  // Filter cities based on search query
  const filteredCities = regionalClimateData.filter(city => 
    city.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOverlay = (id: string) => {
    setActiveOverlay((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Predictive Risk Maps
        </h1>
        <p className="text-gray-400">Interactive climate risk visualization</p>
      </div>

      {/* Search Bar */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-4">
        <div className="flex items-center space-x-2">
          <Search className="text-gray-400" />
          <Input
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1a2332] border-cyan-900/30 text-white placeholder:text-gray-500"
          />
        </div>
      </Card>

      {/* Overlay Controls */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Layers className="text-cyan-400" size={20} />
          <h3 className="text-gray-300">Map Overlays</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {overlays.map((overlay) => (
            <Button
              key={overlay.id}
              variant={activeOverlay.includes(overlay.id) ? "default" : "outline"}
              onClick={() => toggleOverlay(overlay.id)}
              className={
                activeOverlay.includes(overlay.id)
                  ? `bg-gradient-to-r ${overlay.color} text-white`
                  : "border-gray-700 text-gray-300 hover:text-white"
              }
            >
              {overlay.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Map Container */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 overflow-hidden">
        <div className="relative h-[500px] md:h-[600px] bg-[#0a0e1a]">
          {/* Base Map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-40"></div>
              
              {/* Grid overlay to simulate map */}
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(100, 116, 139, 0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>

              {/* Location Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                </div>
                <Badge className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white whitespace-nowrap">
                  Pune, India
                </Badge>
              </div>

              {/* Flood Risk Overlay */}
              {activeOverlay.includes("flood") && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
                  <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl"></div>
                </div>
              )}

              {/* Drought Overlay */}
              {activeOverlay.includes("drought") && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-yellow-500/25 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
                </div>
              )}

              {/* Heatwave Overlay */}
              {activeOverlay.includes("heatwave") && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-red-500/30 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-pink-500/25 rounded-full blur-3xl"></div>
                </div>
              )}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-[#0f1629]/90 backdrop-blur-sm border border-cyan-900/30 rounded-lg p-4">
                <h4 className="text-gray-300 text-sm mb-2">Risk Levels</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-xs text-gray-400">Low</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-xs text-gray-400">Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-xs text-gray-400">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border-blue-500/30 p-4">
          <h4 className="text-blue-400 mb-2">Flood Risk Analysis</h4>
          <p className="text-2xl text-white mb-1">Moderate</p>
          <p className="text-sm text-gray-400">River levels expected to rise in monsoon season</p>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-600/10 to-orange-600/10 border-yellow-500/30 p-4">
          <h4 className="text-yellow-400 mb-2">Drought Probability</h4>
          <p className="text-2xl text-white mb-1">Low</p>
          <p className="text-sm text-gray-400">Adequate water reserves for next 6 months</p>
        </Card>
        <Card className="bg-gradient-to-br from-red-600/10 to-pink-600/10 border-red-500/30 p-4">
          <h4 className="text-red-400 mb-2">Heatwave Intensity</h4>
          <p className="text-2xl text-white mb-1">High</p>
          <p className="text-sm text-gray-400">Peak temperatures expected next week</p>
        </Card>
      </div>
    </div>
  );
}
