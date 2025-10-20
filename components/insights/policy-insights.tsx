"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Leaf, Zap, Target } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const sustainabilityData = [
  { year: "2020", renewable: 25, emissions: 100 },
  { year: "2021", renewable: 28, emissions: 98 },
  { year: "2022", renewable: 32, emissions: 95 },
  { year: "2023", renewable: 36, emissions: 92 },
  { year: "2024", renewable: 40, emissions: 88 },
]

const policyMetrics = [
  {
    icon: Zap,
    title: "Renewable Energy",
    value: "40%",
    description: "Current renewable energy adoption",
    trend: "+4% YoY",
  },
  {
    icon: Leaf,
    title: "Carbon Offset",
    value: "2.5M",
    description: "Tons of CO₂ offset annually",
    trend: "+15% YoY",
  },
  {
    icon: Target,
    title: "Sustainability Goal",
    value: "2050",
    description: "Net-zero target year",
    trend: "On track",
  },
  {
    icon: TrendingUp,
    title: "Green Investment",
    value: "$12B",
    description: "Annual green tech investment",
    trend: "+22% YoY",
  },
]

export function PolicyInsights() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Sustainability Trends</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sustainabilityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
              }}
            />
            <Line
              type="monotone"
              dataKey="renewable"
              stroke="var(--color-chart-3)"
              strokeWidth={2}
              name="Renewable %"
            />
            <Line type="monotone" dataKey="emissions" stroke="var(--color-chart-5)" strokeWidth={2} name="Emissions" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Policy Metrics</h2>
        <div className="grid grid-cols-2 gap-3">
          {policyMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start justify-between mb-2">
                  <Icon className="w-5 h-5 text-accent" />
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    {metric.trend}
                  </span>
                </div>
                <h4 className="font-medium text-foreground text-sm">{metric.title}</h4>
                <p className="text-2xl font-bold text-accent mt-1">{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
