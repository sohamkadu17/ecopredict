"use client"

import { Card } from "@/components/ui/card"
import { Cloud, CloudRain, Sun } from "lucide-react"

const dailyData = [
  {
    time: "6:00 AM",
    temp: "22°C",
    condition: "Clear",
    icon: Sun,
    humidity: "65%",
    windSpeed: "8 km/h",
  },
  {
    time: "12:00 PM",
    temp: "28°C",
    condition: "Partly Cloudy",
    icon: Cloud,
    humidity: "55%",
    windSpeed: "12 km/h",
  },
  {
    time: "6:00 PM",
    temp: "26°C",
    condition: "Cloudy",
    icon: Cloud,
    humidity: "70%",
    windSpeed: "10 km/h",
  },
  {
    time: "12:00 AM",
    temp: "20°C",
    condition: "Rainy",
    icon: CloudRain,
    humidity: "85%",
    windSpeed: "15 km/h",
  },
]

export function DailyForecast() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Today's Hourly Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dailyData.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="p-4 rounded-lg bg-muted/50 border border-border hover:border-accent/50 transition"
            >
              <p className="text-sm font-semibold text-foreground mb-3">{item.time}</p>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-6 h-6 text-accent" />
                <p className="text-2xl font-bold text-foreground">{item.temp}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{item.condition}</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Humidity:</span>
                  <span className="font-medium text-foreground">{item.humidity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wind:</span>
                  <span className="font-medium text-foreground">{item.windSpeed}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
