"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

const sampleResponses: Record<string, string> = {
  "what's the aqi tomorrow":
    "Based on current data, the AQI tomorrow is expected to be around 165, which falls in the 'unhealthy' category. We recommend limiting outdoor activities.",
  "will it rain next week":
    "Our predictive model shows a 65% chance of moderate rainfall next week, particularly on Wednesday and Thursday. Expected precipitation: 40-60mm.",
  "temperature forecast":
    "The temperature is expected to rise by 2-3°C over the next 7 days, reaching a peak of 32°C by Friday. Please stay hydrated and take precautions against heat.",
  "co2 emissions":
    "Current CO₂ levels are at 412 ppm, showing a steady increase. We recommend focusing on renewable energy adoption and reforestation efforts.",
  "drought risk":
    "The drought risk index for your region is currently at 6/10 (moderate). Adequate water management practices are recommended.",
}

export function ChatbotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm EcoPredict AI. Ask me anything about climate patterns, weather forecasts, or environmental insights.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const lowerInput = input.toLowerCase()
      let responseContent = "I'm analyzing your question. Could you provide more details?"

      for (const [key, value] of Object.entries(sampleResponses)) {
        if (lowerInput.includes(key)) {
          responseContent = value
          break
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="flex flex-col h-[600px] border-accent/20">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.type === "user"
                  ? "bg-accent text-accent-foreground rounded-br-none"
                  : "bg-muted text-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about climate, weather, or environmental insights..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage()
              }
            }}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-accent hover:bg-accent/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
