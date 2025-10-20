"use client"

import type { SimulationParams } from "./scenario-simulator"

interface SimulatorSlidersProps {
  params: SimulationParams
  setParams: (params: SimulationParams) => void
}

const sliderConfig = [
  {
    key: "co2Emissions" as const,
    label: "CO₂ Emissions Level",
    min: 0,
    max: 100,
    unit: "%",
    description: "Increase in atmospheric CO₂ concentration",
  },
  {
    key: "deforestation" as const,
    label: "Deforestation Rate",
    min: 0,
    max: 100,
    unit: "%",
    description: "Rate of forest loss and land conversion",
  },
  {
    key: "temperatureRise" as const,
    label: "Temperature Rise",
    min: 0,
    max: 5,
    unit: "°C",
    description: "Expected global temperature increase",
  },
  {
    key: "industrialization" as const,
    label: "Industrialization Level",
    min: 0,
    max: 100,
    unit: "%",
    description: "Industrial activity and economic growth",
  },
]

export function SimulatorSliders({ params, setParams }: SimulatorSlidersProps) {
  const handleSliderChange = (key: keyof SimulationParams, value: number) => {
    setParams({
      ...params,
      [key]: value,
    })
  }

  return (
    <div className="space-y-6">
      {sliderConfig.map((config) => (
        <div key={config.key}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">{config.label}</label>
            <span className="text-sm font-semibold text-accent">
              {params[config.key].toFixed(1)}
              {config.unit}
            </span>
          </div>
          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.key === "temperatureRise" ? 0.1 : 1}
            value={params[config.key]}
            onChange={(e) => handleSliderChange(config.key, Number.parseFloat(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <p className="text-xs text-muted-foreground mt-1">{config.description}</p>
        </div>
      ))}
    </div>
  )
}
