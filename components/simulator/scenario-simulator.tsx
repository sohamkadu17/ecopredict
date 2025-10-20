"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SimulatorSliders } from "./simulator-sliders"
import { SimulatorResults } from "./simulator-results"

export interface SimulationParams {
  co2Emissions: number
  deforestation: number
  temperatureRise: number
  industrialization: number
}

export function ScenarioSimulator() {
  const [params, setParams] = useState<SimulationParams>({
    co2Emissions: 50,
    deforestation: 30,
    temperatureRise: 1.5,
    industrialization: 40,
  })

  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<SimulationParams | null>(null)

  const handleRunSimulation = () => {
    setIsRunning(true)
    setTimeout(() => {
      // Calculate predicted outcomes based on parameters
      const predictedResults = {
        co2Emissions: params.co2Emissions + Math.random() * 20,
        deforestation: params.deforestation + Math.random() * 15,
        temperatureRise: params.temperatureRise + (params.co2Emissions / 100) * 0.5,
        industrialization: params.industrialization + Math.random() * 10,
      }
      setResults(predictedResults)
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    setParams({
      co2Emissions: 50,
      deforestation: 30,
      temperatureRise: 1.5,
      industrialization: 40,
    })
    setResults(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Adjust Parameters</h2>
        <SimulatorSliders params={params} setParams={setParams} />

        <div className="flex gap-3 mt-8">
          <Button onClick={handleRunSimulation} disabled={isRunning} className="flex-1 bg-accent hover:bg-accent/90">
            {isRunning ? "Running Simulation..." : "Run Simulation"}
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
            Reset
          </Button>
        </div>
      </Card>

      <div>
        {results ? (
          <SimulatorResults results={results} originalParams={params} />
        ) : (
          <Card className="p-6 h-full flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Run a simulation to see predicted outcomes</p>
              <p className="text-sm text-muted-foreground">Adjust the parameters and click "Run Simulation"</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
