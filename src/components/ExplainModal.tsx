import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Brain, Database, Satellite, TrendingUp } from "lucide-react";

interface ExplainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExplainModal({ isOpen, onClose }: ExplainModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f1629] border-cyan-900/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            How We Generate Predictions
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Understanding the AI behind EcoPredict
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Explanation Cards */}
          <div className="bg-[#1a2332] rounded-lg p-4 border border-cyan-900/20">
            <div className="flex items-start space-x-3">
              <Database className="text-cyan-400 mt-1" size={24} />
              <div>
                <h4 className="text-cyan-400 mb-2">Historical Data Analysis</h4>
                <p className="text-sm text-gray-400">
                  Our AI models analyze 15+ years of historical weather data from Pune and
                  surrounding regions, identifying patterns in temperature fluctuations, rainfall
                  cycles, and seasonal variations.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-lg p-4 border border-cyan-900/20">
            <div className="flex items-start space-x-3">
              <Satellite className="text-emerald-400 mt-1" size={24} />
              <div>
                <h4 className="text-emerald-400 mb-2">Satellite & Sensor Data</h4>
                <p className="text-sm text-gray-400">
                  We integrate real-time satellite imagery showing cloud formations, atmospheric
                  moisture levels, and ground temperature measurements from weather stations
                  across the region.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-lg p-4 border border-cyan-900/20">
            <div className="flex items-start space-x-3">
              <Brain className="text-purple-400 mt-1" size={24} />
              <div>
                <h4 className="text-purple-400 mb-2">Machine Learning Models</h4>
                <p className="text-sm text-gray-400">
                  Advanced neural networks trained on millions of data points process current
                  atmospheric conditions, historical patterns, and global climate models to
                  generate accurate 30-day forecasts.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-lg p-4 border border-cyan-900/20">
            <div className="flex items-start space-x-3">
              <TrendingUp className="text-orange-400 mt-1" size={24} />
              <div>
                <h4 className="text-orange-400 mb-2">Continuous Learning</h4>
                <p className="text-sm text-gray-400">
                  Our models continuously improve by comparing predictions with actual outcomes,
                  learning from forecast errors, and adapting to evolving climate patterns.
                </p>
              </div>
            </div>
          </div>

          {/* Confidence Metrics */}
          <div className="bg-gradient-to-r from-cyan-600/10 to-emerald-600/10 rounded-lg p-4 border border-cyan-500/30">
            <h4 className="text-white mb-3">Current Prediction Confidence</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Temperature Forecast</span>
                  <span className="text-cyan-400">92%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Rainfall Prediction</span>
                  <span className="text-emerald-400">87%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 border-t border-gray-700 pt-4">
            <p>
              Note: While our AI models are highly accurate, weather prediction involves inherent
              uncertainty. These forecasts should be used as guidance alongside other weather
              services and local expertise.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
