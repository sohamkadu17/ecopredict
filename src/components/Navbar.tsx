import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

export function Navbar({ currentPage, onNavigate, theme, onThemeToggle }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "risk-maps", label: "Risk Maps" },
    { id: "trends", label: "Climate Trends" },
    { id: "simulator", label: "What-If" },
    { id: "agriculture", label: "Agriculture" },
    { id: "carbon", label: "Carbon Tracker" },
  ];

  return (
    <nav className="bg-[#0a0e1a] border-b border-cyan-900/20 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-[#0a0e1a]">🌍</span>
            </div>
            <span className="text-xl bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              EcoPredict
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation with Staggered Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 space-y-2 overflow-hidden"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                className="px-4 pt-2"
              >
                <ThemeToggle theme={theme} onToggle={onThemeToggle} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
