"use client"

import { Card } from "@/components/ui/card"
import { Sprout, Droplets, Sun, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const cropData = [
  { crop: "Rice", yield: 85, optimal: 95 },
  { crop: "Wheat", yield: 78, optimal: 90 },
  { crop: "Corn", yield: 82, optimal: 92 },
  { crop: "Soybean", yield: 75, optimal: 88 },
]

const advisories = [
  {
    icon: Droplets,
    title: "Irrigation Planning",
    description: "Increase irrigation by 15% due to predicted lower rainfall",
    priority: "high",
  },
  {
    icon: Sun,
    title: "Crop Selection",
    description: "Consider heat-resistant varieties for next season",
    priority: "medium",
  },
  {
    icon: Sprout,
    title: "Soil Management",
    description: "Implement mulching to retain soil moisture",
    priority: "medium",
  },
  {
    icon: AlertCircle,
    title: "Pest Alert",
    description: "Monitor for increased pest activity in warm conditions",
    priority: "high",
  },
]

export function AgricultureAdvisory() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Crop Yield Forecast</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={cropData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
              }}
            />
            <Bar dataKey="yield" fill="var(--color-chart-3)" name="Current Yield" />
            <Bar dataKey="optimal" fill="var(--color-chart-4)" name="Optimal Yield" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Farming Recommendations</h2>
        <div className="space-y-3">
          {advisories.map((advisory, index) => {
            const Icon = advisory.icon
            const priorityColor =
              advisory.priority === "high" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
            const iconColor = advisory.priority === "high" ? "text-red-600" : "text-yellow-600"

            return (
              <div key={index} className={`p-4 rounded-lg border ${priorityColor}`}>
                <div className="flex gap-3">
                  <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{advisory.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{advisory.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
