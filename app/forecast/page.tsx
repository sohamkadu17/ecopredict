"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { ForecastSummary } from "@/components/forecast/forecast-summary"
import { DailyForecast } from "@/components/forecast/daily-forecast"
import { WeeklyForecast } from "@/components/forecast/weekly-forecast"

export default function ForecastPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Climate Forecast Report</h1>
          <p className="text-muted-foreground">Daily and weekly climate predictions with detailed insights</p>
        </div>

        <div className="space-y-8">
          <ForecastSummary />
          <DailyForecast />
          <WeeklyForecast />
        </div>
      </main>
    </div>
  )
}
