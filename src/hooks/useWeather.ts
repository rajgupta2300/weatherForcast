import { useState, useCallback } from 'react';
import weatherApi from '../api/weatherApi';
import { CurrentWeatherData, ForecastData, DailyForecast } from '../types/weather';
import { format, parseISO } from 'date-fns';

export const useWeather = () => {
  const [weather, setWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Process forecast data to get daily forecast
  const processForecastData = (data: ForecastData): DailyForecast[] => {
    const dailyData: { [key: string]: ForecastData['list'] } = {};
    
    // Group forecast by day
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    // Get daily min/max and weather for noon
    return Object.entries(dailyData).map(([date, items]) => {
      const temps = items.map(item => item.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);
      
      // Try to get noon forecast for the icon, or use the first one
      const noonForecast = items.find(item => item.dt_txt.includes('12:00')) || items[0];

      const parsedDate = parseISO(date);
      
      return {
        date,
        day: format(parsedDate, 'EEE'),
        min,
        max,
        weather: noonForecast.weather[0],
      };
    }).slice(0, 5); // Get only 5 days
  };

  const fetchWeatherByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherApi.getCurrentWeather(city),
        weatherApi.getForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(processForecastData(forecastData));
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherApi.getCurrentWeatherByCoords(lat, lon),
        weatherApi.getForecastByCoords(lat, lon)
      ]);
      
      setWeather(weatherData);
      setForecast(processForecastData(forecastData));
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords
  };
};