import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cloud } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent/10">
            <Cloud className="w-6 h-6 text-accent" />
          </div>
          <span className="font-bold text-lg text-foreground">EcoPredict</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/simulator">
            <Button variant="ghost">Simulator</Button>
          </Link>
          <Link href="/insights">
            <Button variant="ghost">Insights</Button>
          </Link>
          <Link href="/chatbot">
            <Button>Ask AI</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
