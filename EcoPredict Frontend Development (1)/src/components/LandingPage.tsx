import { motion } from "motion/react";
import { Cloud, MapPin, TrendingUp, Sparkles, Leaf, Factory, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const features = [
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Dashboard",
      description: "Real-time climate analytics with AI-powered insights",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "Risk Maps",
      description: "Interactive regional climate risk visualization",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Climate Trends",
      description: "Historical data analysis and future projections",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "What-If Simulator",
      description: "Test scenarios and predict climate outcomes",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Agriculture Mode",
      description: "Specialized insights for farmers and planners",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: <Factory className="w-12 h-12" />,
      title: "Carbon Tracker",
      description: "Monitor and optimize carbon emissions",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "AI Assistant",
      description: "24/7 climate intelligence chatbot support",
      gradient: "from-cyan-500 to-purple-600",
    },
  ];

  const bentoItems = [
    { size: "large", gradient: "from-cyan-500/20 to-blue-600/20", label: "Predictive Analytics" },
    { size: "small", gradient: "from-emerald-500/20 to-teal-600/20", label: "Live Data" },
    { size: "small", gradient: "from-purple-500/20 to-pink-600/20", label: "AI Models" },
    { size: "medium", gradient: "from-orange-500/20 to-red-600/20", label: "Risk Assessment" },
    { size: "medium", gradient: "from-blue-500/20 to-indigo-600/20", label: "Trend Analysis" },
    { size: "large", gradient: "from-green-500/20 to-emerald-600/20", label: "Climate Forecasting" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Blur Text Effect */}
          <motion.div
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Welcome to
            </h1>
          </motion.div>

          <motion.div
            initial={{ filter: "blur(20px)", opacity: 0, scale: 0.9 }}
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl mb-8 bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              EcoPredict
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Groundbreaking AI-powered predictive climate modeling for a sustainable future
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button
              onClick={onEnter}
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white px-8 py-6 text-xl rounded-xl shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <motion.span
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Enter Dashboard
              </motion.span>
              <Sparkles className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <ChevronDown className="w-8 h-8 mx-auto text-cyan-400 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Features Carousel Section */}
      <section className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-center bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Explore Our Features
          </h2>
          <p className="text-gray-400 text-center mb-12 text-xl">
            Comprehensive climate intelligence at your fingertips
          </p>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <Card className={`p-6 bg-gradient-to-br ${feature.gradient} border-0 h-full backdrop-blur-xl bg-opacity-10 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300`}>
                      <div className="text-white mb-4">{feature.icon}</div>
                      <h3 className="text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>
      </section>

      {/* Magic Bento Grid Section */}
      <section className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Powered by Advanced AI
          </h2>
          <p className="text-gray-400 text-center mb-12 text-xl">
            Cutting-edge technology for climate prediction
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {bentoItems.map((item, index) => {
              const colSpan = item.size === "large" ? "md:col-span-2" : item.size === "medium" ? "md:col-span-2" : "md:col-span-1";
              const rowSpan = item.size === "large" ? "row-span-2" : "row-span-1";
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className={`${colSpan} ${rowSpan} relative overflow-hidden rounded-2xl`}
                >
                  <Card className={`h-full min-h-[150px] bg-gradient-to-br ${item.gradient} border border-cyan-500/20 backdrop-blur-xl flex items-center justify-center hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300`}>
                    <motion.div
                      className="text-center p-6"
                      whileHover={{ scale: 1.1 }}
                    >
                      <p className="text-white">{item.label}</p>
                    </motion.div>
                    
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Ready to Transform Climate Intelligence?
          </h2>
          <p className="text-gray-300 mb-8 text-xl">
            Join thousands of farmers, planners, and climate experts using EcoPredict
          </p>
          <Button
            onClick={onEnter}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white px-8 py-6 text-xl rounded-xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300"
          >
            Get Started Now
            <Sparkles className="ml-2 w-6 h-6" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
