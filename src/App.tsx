import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { RiskMaps } from "./components/RiskMaps";
import { ClimateTrends } from "./components/ClimateTrends";
import { ScenarioSimulator } from "./components/ScenarioSimulator";
import { AgricultureMode } from "./components/AgricultureMode";
import { CarbonTracker } from "./components/CarbonTracker";
import { ChatBot } from "./components/ChatBot";
import { ExplainModal } from "./components/ExplainModal";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [explainModalOpen, setExplainModalOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Apply theme class to document
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onOpenExplain={() => setExplainModalOpen(true)} />;
      case "risk-maps":
        return <RiskMaps />;
      case "trends":
        return <ClimateTrends />;
      case "simulator":
        return <ScenarioSimulator />;
      case "agriculture":
        return <AgricultureMode />;
      case "carbon":
        return <CarbonTracker />;
      default:
        return <Dashboard onOpenExplain={() => setExplainModalOpen(true)} />;
    }
  };

  if (showLanding) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onEnter={handleEnterApp} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="app"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`min-h-screen ${theme === "dark" ? "bg-[#0a0e1a] dark" : "bg-gray-50"}`}
      >
        <Navbar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />
        <main className="pb-20">{renderPage()}</main>
        <ChatBot />
        <ExplainModal isOpen={explainModalOpen} onClose={() => setExplainModalOpen(false)} />
      </motion.div>
    </AnimatePresence>
  );
}
