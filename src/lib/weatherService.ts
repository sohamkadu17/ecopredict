export interface WeatherData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
    wind: {
      speed: number;
    };
    pop: number;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export interface AirQualityData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      pm2_5: number;
      o3: number;
      no2: number;
      so2: number;
      co: number;
    };
  }>;
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
}

export async function fetchAirQuality(lat: number, lon: number): Promise<AirQualityData> {
  const response = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch air quality data');
  }
  return response.json();
}