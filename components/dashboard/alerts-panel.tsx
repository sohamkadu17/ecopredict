import { Card } from "@/components/ui/card"
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"

const alerts = [
  {
    id: 1,
    title: "High Temperature Alert",
    description: "Temperature expected to exceed 35°C",
    severity: "critical",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Moderate AQI Warning",
    description: "Air quality index rising in urban areas",
    severity: "warning",
    time: "4 hours ago",
  },
  {
    id: 3,
    title: "Rainfall Expected",
    description: "Moderate rainfall predicted for next 24 hours",
    severity: "normal",
    time: "6 hours ago",
  },
]

export function AlertsPanel() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Early Warnings</h3>
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon =
            alert.severity === "critical" ? AlertCircle : alert.severity === "warning" ? AlertTriangle : CheckCircle

          const bgColor =
            alert.severity === "critical"
              ? "bg-red-50 border-red-200"
              : alert.severity === "warning"
                ? "bg-yellow-50 border-yellow-200"
                : "bg-green-50 border-green-200"

          const iconColor =
            alert.severity === "critical"
              ? "text-red-600"
              : alert.severity === "warning"
                ? "text-yellow-600"
                : "text-green-600"

          return (
            <div key={alert.id} className={`p-4 rounded-lg border ${bgColor}`}>
              <div className="flex gap-3">
                <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm">{alert.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
