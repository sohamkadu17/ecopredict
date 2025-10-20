import { Card } from "@/components/ui/card"
import { TrendingUp, Cloud, Leaf, AlertCircle } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Monitor temperature, rainfall, and emissions with live data updates",
  },
  {
    icon: Cloud,
    title: "Predictive Forecasting",
    description: "AI-powered predictions for weather patterns and climate trends",
  },
  {
    icon: Leaf,
    title: "Sustainability Insights",
    description: "Agriculture and policy recommendations for a sustainable future",
  },
  {
    icon: AlertCircle,
    title: "Early Warning System",
    description: "Get alerts for extreme weather events and climate risks",
  },
]

export function FeaturesOverview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Comprehensive Climate Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Everything you need to understand and predict climate patterns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow duration-300 border-accent/10 hover:border-accent/30"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-accent/10">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
