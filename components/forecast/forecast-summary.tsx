"use client"

import { Card } from "@/components/ui/card"
import { Cloud, Droplets, Wind, AlertTriangle } from "lucide-react"

const summaryCards = [
  {
    icon: Cloud,
    label: "Temperature",
    value: "28.5°C",
    subtext: "High of 32°C",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
  },
  {
    icon: Droplets,
    label: "Rainfall",
    value: "45%",
    subtext: "Chance of rain",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    icon: Wind,
    label: "Wind Speed",
    value: "12 km/h",
    subtext: "Light breeze",
    color: "bg-cyan-50 border-cyan-200",
    iconColor: "text-cyan-600",
  },
  {
    icon: AlertTriangle,
    label: "AQI",
    value: "156",
    subtext: "Unhealthy",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-600",
  },
]

export function ForecastSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className={`p-6 border ${card.color}`}>
            <div className="flex items-start justify-between mb-4">
              <Icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-2">{card.subtext}</p>
          </Card>
        )
      })}
    </div>
  )
}
