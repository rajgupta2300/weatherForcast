import axios from 'axios';
import { CurrentWeatherData, ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = {
  getCurrentWeather: async (city: string): Promise<CurrentWeatherData> => {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });
    return response.data;
  },

  getCurrentWeatherByCoords: async (lat: number, lon: number): Promise<CurrentWeatherData> => {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: API_KEY,
      },
    });
    return response.data;
  },

  getForecast: async (city: string): Promise<ForecastData> => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });
    return response.data;
  },

  getForecastByCoords: async (lat: number, lon: number): Promise<ForecastData> => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: API_KEY,
      },
    });
    return response.data;
  },
};

export default weatherApi;