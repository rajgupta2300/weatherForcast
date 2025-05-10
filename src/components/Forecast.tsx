import React from 'react';
import { DailyForecast } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherUtils';

interface ForecastProps {
  forecast: DailyForecast[];
  theme: {
    text: string;
    card: string;
  };
}

export const Forecast: React.FC<ForecastProps> = ({ forecast, theme }) => {
  return (
    <div className={theme.text}>
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      
      <div className="grid grid-cols-5 gap-2">
        {forecast.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.weather.id);
          
          return (
            <div 
              key={index}
              className={`backdrop-blur-sm ${theme.card} rounded-xl p-3 flex flex-col items-center transition-all hover:bg-white/20`}
            >
              <p className="text-sm font-medium">{index === 0 ? 'Today' : day.day}</p>
              <WeatherIcon size={28} className="my-2" />
              <p className="text-xs opacity-80">{day.weather.main}</p>
              <div className="flex justify-between w-full mt-2 text-sm">
                <span className="font-bold">{Math.round(day.max)}°</span>
                <span className="opacity-80">{Math.round(day.min)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};