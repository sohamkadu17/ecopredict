"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const temperatureData = [
  { month: "Jan", temp: 22, forecast: 23 },
  { month: "Feb", temp: 24, forecast: 25 },
  { month: "Mar", temp: 26, forecast: 27 },
  { month: "Apr", temp: 28, forecast: 29 },
  { month: "May", temp: 30, forecast: 31 },
  { month: "Jun", temp: 32, forecast: 33 },
]

const rainfallData = [
  { month: "Jan", rainfall: 120, average: 100 },
  { month: "Feb", rainfall: 110, average: 95 },
  { month: "Mar", rainfall: 140, average: 120 },
  { month: "Apr", rainfall: 180, average: 150 },
  { month: "May", rainfall: 200, average: 180 },
  { month: "Jun", rainfall: 220, average: 200 },
]

const co2Data = [
  { year: "2019", emissions: 400 },
  { year: "2020", emissions: 405 },
  { year: "2021", emissions: 408 },
  { year: "2022", emissions: 410 },
  { year: "2023", emissions: 412 },
  { year: "2024", emissions: 414 },
]

interface ChartsSectionProps {
  activeTab: string
}

export function ChartsSection({ activeTab }: ChartsSectionProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Temperature Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="var(--color-chart-1)" strokeWidth={2} />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Rainfall Patterns</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rainfallData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
              }}
            />
            <Legend />
            <Bar dataKey="rainfall" fill="var(--color-chart-3)" />
            <Bar dataKey="average" fill="var(--color-chart-4)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">CO₂ Emissions Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={co2Data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="emissions" stroke="var(--color-chart-5)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
