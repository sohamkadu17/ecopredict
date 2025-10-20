"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Thermometer, Wind, Droplets, TrendingUp } from "lucide-react"

const metrics = [
  {
    id: "temperature",
    label: "Temperature",
    icon: Thermometer,
    value: "28.5°C",
    change: "+2.3°C",
    status: "warning",
  },
  {
    id: "rainfall",
    label: "Rainfall",
    icon: Droplets,
    value: "245mm",
    change: "-15mm",
    status: "normal",
  },
  {
    id: "aqi",
    label: "Air Quality Index",
    icon: Wind,
    value: "156",
    change: "+12",
    status: "warning",
  },
  {
    id: "co2",
    label: "CO₂ Emissions",
    icon: TrendingUp,
    value: "412ppm",
    change: "+2.1ppm",
    status: "critical",
  },
]

interface MetricsGridProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function MetricsGrid({ activeTab, setActiveTab }: MetricsGridProps) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Climate Dashboard</h1>
        <p className="text-muted-foreground">Real-time climate data and predictive insights</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          {metrics.map((metric) => (
            <TabsTrigger key={metric.id} value={metric.id}>
              {metric.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const statusColor =
            metric.status === "critical"
              ? "bg-red-50 border-red-200"
              : metric.status === "warning"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-green-50 border-green-200"

          const textColor =
            metric.status === "critical"
              ? "text-red-700"
              : metric.status === "warning"
                ? "text-yellow-700"
                : "text-green-700"

          return (
            <Card key={metric.id} className={`p-6 border ${statusColor}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-background">
                  <Icon className={`w-5 h-5 ${textColor}`} />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${textColor} bg-white/50`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{metric.label}</h3>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
