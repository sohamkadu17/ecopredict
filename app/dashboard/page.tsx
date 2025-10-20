"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { MetricsGrid } from "@/components/dashboard/metrics-grid"
import { ChartsSection } from "@/components/dashboard/charts-section"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("temperature")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MetricsGrid activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <ChartsSection activeTab={activeTab} />
          </div>
          <div>
            <AlertsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
