import React from 'react';
import { CurrentWeatherData } from '../types/weather';
import { formatDate } from '../utils/dateUtils';
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  Eye, 
  Sunrise, 
  Sunset,
  MapPin
} from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherUtils';

interface CurrentWeatherProps {
  weather: CurrentWeatherData;
  theme: {
    text: string;
    card: string;
  };
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, theme }) => {
  const WeatherIcon = getWeatherIcon(weather.weather[0].id);
  
  return (
    <div className="mb-8">
      <div className={`flex flex-col md:flex-row items-center justify-between gap-4 mb-6 ${theme.text}`}>
        <div className="flex items-center">
          <div className="mr-4">
            <WeatherIcon size={64} className={theme.text} />
          </div>
          <div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
            </div>
            <p className="text-sm opacity-80">{formatDate(weather.dt * 1000)}</p>
            <p className="text-lg capitalize">{weather.weather[0].description}</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</div>
          <div className="text-sm mt-1">
            Feels like: {Math.round(weather.main.feels_like)}°C
          </div>
          <div className="flex justify-center text-sm mt-1">
            <span className="mr-2">H: {Math.round(weather.main.temp_max)}°C</span>
            <span>L: {Math.round(weather.main.temp_min)}°C</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`backdrop-blur-sm ${theme.card} rounded-xl p-4 flex flex-col items-center transition-transform hover:scale-105 ${theme.text}`}>
          <Thermometer size={24} className="mb-2" />
          <p className="text-sm opacity-80">Pressure</p>
          <p className="font-semibold">{weather.main.pressure} hPa</p>
        </div>
        
        <div className={`backdrop-blur-sm ${theme.card} rounded-xl p-4 flex flex-col items-center transition-transform hover:scale-105 ${theme.text}`}>
          <Droplets size={24} className="mb-2" />
          <p className="text-sm opacity-80">Humidity</p>
          <p className="font-semibold">{weather.main.humidity}%</p>
        </div>
        
        <div className={`backdrop-blur-sm ${theme.card} rounded-xl p-4 flex flex-col items-center transition-transform hover:scale-105 ${theme.text}`}>
          <Wind size={24} className="mb-2" />
          <p className="text-sm opacity-80">Wind</p>
          <p className="font-semibold">{Math.round(weather.wind.speed * 3.6)} km/h</p>
        </div>
        
        <div className={`backdrop-blur-sm ${theme.card} rounded-xl p-4 flex flex-col items-center transition-transform hover:scale-105 ${theme.text}`}>
          <Eye size={24} className="mb-2" />
          <p className="text-sm opacity-80">Visibility</p>
          <p className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>
      </div>

      <div className={`mt-4 flex justify-between backdrop-blur-sm ${theme.card} rounded-xl p-4 ${theme.text}`}>
        <div className="flex items-center">
          <Sunrise size={20} className="mr-2" />
          <div>
            <p className="text-sm opacity-80">Sunrise</p>
            <p className="font-semibold">
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Sunset size={20} className="mr-2" />
          <div>
            <p className="text-sm opacity-80">Sunset</p>
            <p className="font-semibold">
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};