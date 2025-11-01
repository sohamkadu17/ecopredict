import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "motion/react";

// Split Text Component for Bot Messages
function SplitText({ text }: { text: string }) {
  const words = text.split(" ");
  
  return (
    <p className="text-sm">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: index * 0.03 }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Hello! I'm your EcoPredict AI assistant. How can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const mockResponses: Record<string, string> = {
    "weather tomorrow": "Based on current predictions, tomorrow will be partly cloudy with a high of 33°C and low of 25°C. There's a 20% chance of light rain in the evening.",
    "flood risk": "The current flood risk in Pune is moderate. We're monitoring monsoon patterns closely. River levels are expected to rise slightly next week, but no immediate danger is predicted.",
    "plant wheat": "The optimal time to plant wheat in Pune is between November and December. Based on current soil moisture (68%) and upcoming weather patterns, I recommend planting around November 15th for best results.",
    "air quality": "Current AQI is 68 (Moderate). Main pollutants are PM2.5 and NO₂. I recommend limiting outdoor activities during peak afternoon hours and using air purifiers indoors.",
    "default": "I can help you with weather forecasts, climate predictions, flood and drought risks, agricultural advice, and air quality information. What would you like to know more about?",
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = mockResponses.default;

      if (lowerInput.includes("weather") || lowerInput.includes("tomorrow")) {
        response = mockResponses["weather tomorrow"];
      } else if (lowerInput.includes("flood") || lowerInput.includes("risk")) {
        response = mockResponses["flood risk"];
      } else if (lowerInput.includes("plant") || lowerInput.includes("wheat") || lowerInput.includes("crop")) {
        response = mockResponses["plant wheat"];
      } else if (lowerInput.includes("air") || lowerInput.includes("quality") || lowerInput.includes("aqi")) {
        response = mockResponses["air quality"];
      }

      const botMessage = { text: response, sender: "bot" as const };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputValue("");
  };

  const quickQuestions = [
    "What is the weather tomorrow?",
    "Is there a flood risk in my area?",
    "When should I plant wheat?",
  ];

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-96 z-50"
          >
            <Card className="bg-[#0f1629] border-cyan-900/30 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-emerald-600 p-4">
                <h3 className="text-white">EcoPredict AI Assistant</h3>
                <p className="text-xs text-cyan-100">Powered by climate intelligence</p>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {messages.map((message, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white"
                          : "bg-[#1a2332] text-gray-200"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <SplitText text={message.text} />
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-xs text-gray-400">Quick questions:</p>
                    {quickQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInputValue(question);
                          handleSend();
                        }}
                        className="block w-full text-left text-sm text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 rounded p-2 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-cyan-900/30">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me anything..."
                    className="bg-[#1a2332] border-cyan-900/30 text-white placeholder:text-gray-500"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-cyan-600 to-emerald-600"
                    size="icon"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
