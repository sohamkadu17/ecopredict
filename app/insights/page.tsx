"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { AgricultureAdvisory } from "@/components/insights/agriculture-advisory"
import { PolicyInsights } from "@/components/insights/policy-insights"

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Agriculture & Policy Insights</h1>
          <p className="text-muted-foreground">Data-driven recommendations for sustainable practices and policy</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AgricultureAdvisory />
          <PolicyInsights />
        </div>
      </main>
    </div>
  )
}
