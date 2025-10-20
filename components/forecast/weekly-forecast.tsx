"use client"

import { Card } from "@/components/ui/card"
import { Cloud, CloudRain, Sun } from "lucide-react"

const weeklyData = [
  {
    day: "Monday",
    high: "32°C",
    low: "22°C",
    condition: "Sunny",
    icon: Sun,
    rainfall: "0%",
    progress: 0,
  },
  {
    day: "Tuesday",
    high: "30°C",
    low: "21°C",
    condition: "Partly Cloudy",
    icon: Cloud,
    rainfall: "20%",
    progress: 20,
  },
  {
    day: "Wednesday",
    high: "28°C",
    low: "19°C",
    condition: "Rainy",
    icon: CloudRain,
    rainfall: "65%",
    progress: 65,
  },
  {
    day: "Thursday",
    high: "26°C",
    low: "18°C",
    condition: "Rainy",
    icon: CloudRain,
    rainfall: "75%",
    progress: 75,
  },
  {
    day: "Friday",
    high: "29°C",
    low: "20°C",
    condition: "Cloudy",
    icon: Cloud,
    rainfall: "30%",
    progress: 30,
  },
  {
    day: "Saturday",
    high: "31°C",
    low: "21°C",
    condition: "Sunny",
    icon: Sun,
    rainfall: "5%",
    progress: 5,
  },
  {
    day: "Sunday",
    high: "33°C",
    low: "23°C",
    condition: "Sunny",
    icon: Sun,
    rainfall: "0%",
    progress: 0,
  },
]

export function WeeklyForecast() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">7-Day Forecast</h2>
      <div className="space-y-4">
        {weeklyData.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="p-4 rounded-lg bg-muted/30 border border-border hover:border-accent/50 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <Icon className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">{item.day}</p>
                    <p className="text-xs text-muted-foreground">{item.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{item.high}</p>
                  <p className="text-xs text-muted-foreground">{item.low}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Rainfall Chance</span>
                  <span className="font-medium text-foreground">{item.rainfall}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
