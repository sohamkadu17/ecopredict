"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import type { SimulationParams } from "./scenario-simulator"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SimulatorResultsProps {
  results: SimulationParams
  originalParams: SimulationParams
}

export function SimulatorResults({ results, originalParams }: SimulatorResultsProps) {
  const projectionData = [
    { year: "2025", temp: 1.5, co2: 420 },
    { year: "2030", temp: 1.8, co2: 435 },
    { year: "2040", temp: 2.2, co2: 460 },
    { year: "2050", temp: 2.8, co2: 490 },
    { year: "2100", temp: 4.2, co2: 600 },
  ]

  const getRiskLevel = (value: number) => {
    if (value > 75) return { level: "Critical", color: "text-red-600", bg: "bg-red-50" }
    if (value > 50) return { level: "High", color: "text-orange-600", bg: "bg-orange-50" }
    if (value > 25) return { level: "Moderate", color: "text-yellow-600", bg: "bg-yellow-50" }
    return { level: "Low", color: "text-green-600", bg: "bg-green-50" }
  }

  const resultMetrics = [
    {
      label: "Predicted CO₂ Level",
      value: results.co2Emissions.toFixed(1),
      unit: "ppm",
      change: (results.co2Emissions - originalParams.co2Emissions).toFixed(1),
      risk: getRiskLevel(results.co2Emissions),
    },
    {
      label: "Temperature Increase",
      value: results.temperatureRise.toFixed(2),
      unit: "°C",
      change: (results.temperatureRise - originalParams.temperatureRise).toFixed(2),
      risk: getRiskLevel(results.temperatureRise * 20),
    },
    {
      label: "Deforestation Impact",
      value: results.deforestation.toFixed(1),
      unit: "%",
      change: (results.deforestation - originalParams.deforestation).toFixed(1),
      risk: getRiskLevel(results.deforestation),
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Predicted Outcomes</h2>
        <div className="space-y-3">
          {resultMetrics.map((metric, index) => {
            const risk = metric.risk
            return (
              <div key={index} className={`p-4 rounded-lg border ${risk.bg}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{metric.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${risk.color}`}>
                      {metric.value}
                      {metric.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${risk.color}`}>{risk.level}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}
                      {metric.unit}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Long-term Projection</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
              }}
            />
            <Line type="monotone" dataKey="temp" stroke="var(--color-chart-1)" strokeWidth={2} name="Temp (°C)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Mitigation Recommended</p>
            <p className="text-xs text-blue-700 mt-1">
              Consider implementing renewable energy, reforestation, and sustainable practices to reduce these impacts.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
