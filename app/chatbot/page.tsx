"use client"

import { ChatbotPanel } from "@/components/chatbot/chatbot-panel"
import { DashboardHeader } from "@/components/dashboard/header"

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">EcoPredict AI Assistant</h1>
          <p className="text-muted-foreground">Ask questions about climate patterns, predictions, and insights</p>
        </div>
        <ChatbotPanel />
      </main>
    </div>
  )
}
