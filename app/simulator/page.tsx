"use client"

import { ScenarioSimulator } from "@/components/simulator/scenario-simulator"
import { DashboardHeader } from "@/components/dashboard/header"

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Climate Scenario Simulator</h1>
          <p className="text-muted-foreground">Adjust parameters to see predicted climate outcomes in real-time</p>
        </div>
        <ScenarioSimulator />
      </main>
    </div>
  )
}
