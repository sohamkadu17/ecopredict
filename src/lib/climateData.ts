// Types
export interface ClimateData {
  year: number;
  temperature: number;
  rainfall: number;
  extremeEvents: number;
}

export interface RegionalData {
  city: string;
  position: { top: string; left: string };
  tempTrend: string;
  rainfallTrend: string;
  extremesTrend: string;
  riskLevel: "high" | "medium" | "low";
}

// Historical climate data (2015-2024)
export const historicalClimateData: ClimateData[] = [
  { year: 2015, temperature: 28.2, rainfall: 2100, extremeEvents: 3 },
  { year: 2016, temperature: 28.5, rainfall: 2050, extremeEvents: 4 },
  { year: 2017, temperature: 28.7, rainfall: 1980, extremeEvents: 5 },
  { year: 2018, temperature: 29.0, rainfall: 1920, extremeEvents: 6 },
  { year: 2019, temperature: 29.2, rainfall: 1850, extremeEvents: 7 },
  { year: 2020, temperature: 29.5, rainfall: 1780, extremeEvents: 8 },
  { year: 2021, temperature: 29.8, rainfall: 1720, extremeEvents: 8 },
  { year: 2022, temperature: 30.0, rainfall: 1650, extremeEvents: 9 },
  { year: 2023, temperature: 30.3, rainfall: 1590, extremeEvents: 10 },
  { year: 2024, temperature: 30.5, rainfall: 1520, extremeEvents: 11 }
];

// Climate projections (2025-2034)
export const projectedClimateData: ClimateData[] = [
  { year: 2025, temperature: 30.8, rainfall: 1450, extremeEvents: 12 },
  { year: 2026, temperature: 31.0, rainfall: 1400, extremeEvents: 13 },
  { year: 2027, temperature: 31.3, rainfall: 1350, extremeEvents: 14 },
  { year: 2028, temperature: 31.5, rainfall: 1300, extremeEvents: 15 },
  { year: 2029, temperature: 31.8, rainfall: 1250, extremeEvents: 16 },
  { year: 2030, temperature: 32.0, rainfall: 1200, extremeEvents: 17 },
  { year: 2031, temperature: 32.3, rainfall: 1150, extremeEvents: 18 },
  { year: 2032, temperature: 32.5, rainfall: 1100, extremeEvents: 19 },
  { year: 2033, temperature: 32.8, rainfall: 1050, extremeEvents: 20 },
  { year: 2034, temperature: 33.0, rainfall: 1000, extremeEvents: 21 }
];

// Regional data
export const regionalClimateData: RegionalData[] = [
  {
    city: "Mumbai",
    position: { top: "55%", left: "15%" },
    tempTrend: "+0.6°C/decade",
    rainfallTrend: "-8mm/year",
    extremesTrend: "+2.1 events/year",
    riskLevel: "high"
  },
  {
    city: "Delhi",
    position: { top: "20%", left: "40%" },
    tempTrend: "+0.7°C/decade",
    rainfallTrend: "-10mm/year",
    extremesTrend: "+2.5 events/year",
    riskLevel: "high"
  },
  {
    city: "Pune",
    position: { top: "60%", left: "25%" },
    tempTrend: "+0.5°C/decade",
    rainfallTrend: "-5mm/year",
    extremesTrend: "+1.8 events/year",
    riskLevel: "medium"
  },
  {
    city: "Chennai",
    position: { top: "70%", left: "45%" },
    tempTrend: "+0.4°C/decade",
    rainfallTrend: "-7mm/year",
    extremesTrend: "+2.0 events/year",
    riskLevel: "high"
  },
  {
    city: "Kolkata",
    position: { top: "45%", left: "70%" },
    tempTrend: "+0.5°C/decade",
    rainfallTrend: "-6mm/year",
    extremesTrend: "+1.9 events/year",
    riskLevel: "medium"
  }
];

// Risk assessment data
export const riskAssessmentData = {
  flood: {
    high: ["Mumbai", "Chennai", "Kolkata"],
    medium: ["Delhi", "Pune"],
    low: ["Bangalore", "Hyderabad"]
  },
  drought: {
    high: ["Delhi", "Bangalore"],
    medium: ["Pune", "Hyderabad"],
    low: ["Mumbai", "Chennai", "Kolkata"]
  },
  heatwave: {
    high: ["Delhi", "Pune"],
    medium: ["Mumbai", "Hyderabad"],
    low: ["Chennai", "Kolkata", "Bangalore"]
  }
};