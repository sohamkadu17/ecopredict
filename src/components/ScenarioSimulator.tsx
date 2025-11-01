import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useState } from "react";
import { TrendingUp, TrendingDown, Droplets, ThermometerSun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ScenarioSimulator() {
  const [co2Emissions, setCo2Emissions] = useState<number[]>([0]);
  const [deforestation, setDeforestation] = useState<number[]>([50]);
  const [showResults, setShowResults] = useState(false);

  const runSimulation = () => {
    setShowResults(true);
  };

  const resetSimulation = () => {
    setCo2Emissions([0]);
    setDeforestation([50]);
    setShowResults(false);
  };

  // Calculate impacts based on parameters
  const tempChange = (co2Emissions[0] * 0.02 + (deforestation[0] - 50) * 0.01).toFixed(2);
  const seaLevelChange = (co2Emissions[0] * 0.5 + (deforestation[0] - 50) * 0.3).toFixed(1);
  const rainfallChange = (-co2Emissions[0] * 0.3 - (deforestation[0] - 50) * 0.2).toFixed(1);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          What-If Scenario Simulator
        </h1>
        <p className="text-gray-400">Model future climate scenarios based on human actions</p>
      </div>

      {/* Controls */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <h3 className="text-gray-300 mb-6">Simulation Parameters</h3>
        
        <div className="space-y-8">
          {/* CO2 Emissions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-300">CO₂ Emissions Change</label>
              <span className="text-cyan-400">
                {co2Emissions[0] > 0 ? "+" : ""}
                {co2Emissions[0]}%
              </span>
            </div>
            <Slider
              value={co2Emissions}
              onValueChange={setCo2Emissions}
              min={-20}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>-20% (Strong Reduction)</span>
              <span>+20% (High Increase)</span>
            </div>
          </div>

          {/* Deforestation Rate */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-300">Deforestation Rate</label>
              <span className="text-emerald-400">
                {deforestation[0] < 33 ? "Low" : deforestation[0] < 67 ? "Moderate" : "High"}
              </span>
            </div>
            <Slider
              value={deforestation}
              onValueChange={setDeforestation}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            onClick={runSimulation}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white"
          >
            Run Simulation
          </Button>
          {showResults && (
            <Button onClick={resetSimulation} variant="outline" className="border-gray-700">
              Reset
            </Button>
          )}
        </div>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Temperature Impact */}
            <Card className="bg-gradient-to-br from-red-600/10 to-orange-600/10 border-red-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <ThermometerSun className="text-red-400" size={32} />
                {parseFloat(tempChange) > 0 ? (
                  <TrendingUp className="text-red-400" size={24} />
                ) : (
                  <TrendingDown className="text-green-400" size={24} />
                )}
              </div>
              <h4 className="text-gray-300 mb-2">Global Temperature</h4>
              <p className="text-3xl text-white mb-2">
                {parseFloat(tempChange) > 0 ? "+" : ""}
                {tempChange}°C
              </p>
              <p className="text-sm text-gray-400">
                {parseFloat(tempChange) > 0.5
                  ? "Significant warming expected"
                  : parseFloat(tempChange) > 0
                  ? "Moderate temperature increase"
                  : "Temperature stabilized"}
              </p>
            </Card>

            {/* Sea Level Impact */}
            <Card className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border-blue-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <Droplets className="text-blue-400" size={32} />
                {parseFloat(seaLevelChange) > 0 ? (
                  <TrendingUp className="text-blue-400" size={24} />
                ) : (
                  <TrendingDown className="text-green-400" size={24} />
                )}
              </div>
              <h4 className="text-gray-300 mb-2">Sea Level Rise</h4>
              <p className="text-3xl text-white mb-2">
                {parseFloat(seaLevelChange) > 0 ? "+" : ""}
                {seaLevelChange} cm
              </p>
              <p className="text-sm text-gray-400">
                {parseFloat(seaLevelChange) > 5
                  ? "Coastal areas at risk"
                  : parseFloat(seaLevelChange) > 0
                  ? "Moderate sea level rise"
                  : "Sea levels controlled"}
              </p>
            </Card>

            {/* Rainfall Impact */}
            <Card className="bg-gradient-to-br from-cyan-600/10 to-emerald-600/10 border-cyan-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <svg
                  className="text-cyan-400"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                {parseFloat(rainfallChange) < 0 ? (
                  <TrendingDown className="text-red-400" size={24} />
                ) : (
                  <TrendingUp className="text-green-400" size={24} />
                )}
              </div>
              <h4 className="text-gray-300 mb-2">Rainfall Patterns</h4>
              <p className="text-3xl text-white mb-2">
                {parseFloat(rainfallChange) > 0 ? "+" : ""}
                {rainfallChange}%
              </p>
              <p className="text-sm text-gray-400">
                {parseFloat(rainfallChange) < -5
                  ? "Severe drought risk"
                  : parseFloat(rainfallChange) < 0
                  ? "Reduced precipitation"
                  : "Increased rainfall"}
              </p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-[#0f1629] to-[#1a2332] border-cyan-900/30 p-6">
        <h3 className="text-gray-300 mb-4">About This Simulation</h3>
        <p className="text-gray-400 mb-4">
          This interactive simulator uses AI-powered climate models to predict the impact of
          human activities on our planet. Adjust the parameters above to see how different
          scenarios affect global temperature, sea levels, and rainfall patterns.
        </p>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-sm text-yellow-400">
            ⚠️ Note: These predictions are simplified models for educational purposes. Actual
            climate systems involve many more complex variables.
          </p>
        </div>
      </Card>
    </div>
  );
}
