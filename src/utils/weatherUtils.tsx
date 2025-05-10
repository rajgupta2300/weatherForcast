import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  CloudSun,
  Thermometer,
} from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

export const getWeatherIcon = (id: number): LucideIcon => {
  // Based on OpenWeatherMap condition codes
  // https://openweathermap.org/weather-conditions
  
  if (id >= 200 && id < 300) {
    return CloudLightning; // Thunderstorm
  } else if (id >= 300 && id < 400) {
    return CloudDrizzle; // Drizzle
  } else if (id >= 500 && id < 600) {
    return CloudRain; // Rain
  } else if (id >= 600 && id < 700) {
    return CloudSnow; // Snow
  } else if (id >= 700 && id < 800) {
    return CloudFog; // Atmosphere (fog, mist, etc.)
  } else if (id === 800) {
    return Sun; // Clear sky
  } else if (id === 801) {
    return CloudSun; // Few clouds
  } else if (id > 801 && id < 900) {
    return Cloud; // Clouds
  }
  
  return Thermometer; // Default
};