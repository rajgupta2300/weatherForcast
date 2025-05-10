import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { WeatherMap } from './components/WeatherMap';
import { useWeather } from './hooks/useWeather';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';

function App() {
  const [query, setQuery] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const { 
    weather, 
    forecast, 
    loading, 
    error, 
    fetchWeatherByCity, 
    fetchWeatherByCoords
  } = useWeather();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeatherByCity('London');
        }
      );
    } else {
      fetchWeatherByCity('London');
    }
  }, [fetchWeatherByCoords, fetchWeatherByCity]);

  useEffect(() => {
    if (weather?.name) {
      // Default landmark images for different weather conditions
      const weatherCondition = weather.weather[0].main.toLowerCase();
      let defaultImage = '';
      
      switch (true) {
        case weatherCondition.includes('clear'):
          defaultImage = 'https://images.pexels.com/photos/2931915/pexels-photo-2931915.jpeg';
          break;
        case weatherCondition.includes('cloud'):
          defaultImage = 'https://images.pexels.com/photos/3742711/pexels-photo-3742711.jpeg';
          break;
        case weatherCondition.includes('rain'):
          defaultImage = 'https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg';
          break;
        case weatherCondition.includes('snow'):
          defaultImage = 'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg';
          break;
        default:
          defaultImage = 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg';
      }
      
      setBackgroundImage(defaultImage);
    }
  }, [weather]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      fetchWeatherByCity(searchQuery);
    }
  };

  const getWeatherTheme = () => {
    if (!weather) return {
      background: 'from-blue-400/80 to-blue-800/80',
      card: 'bg-white/10',
      text: 'text-white'
    };
    
    const condition = weather.weather[0].main.toLowerCase();
    const isDaytime = weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset;
    
    switch (true) {
      case condition.includes('clear') && isDaytime:
        return {
          background: 'from-sky-400/80 to-blue-600/80',
          card: 'bg-white/10',
          text: 'text-white'
        };
      case condition.includes('clear'):
        return {
          background: 'from-indigo-900/80 to-purple-900/80',
          card: 'bg-white/10',
          text: 'text-white'
        };
      case condition.includes('cloud'):
        return {
          background: 'from-gray-300/80 to-slate-700/80',
          card: 'bg-white/10',
          text: 'text-white'
        };
      case condition.includes('rain') || condition.includes('drizzle'):
        return {
          background: 'from-slate-700/80 to-slate-900/80',
          card: 'bg-white/10',
          text: 'text-white'
        };
      case condition.includes('thunderstorm'):
        return {
          background: 'from-slate-900/80 to-purple-900/80',
          card: 'bg-white/10',
          text: 'text-white'
        };
      case condition.includes('snow'):
        return {
          background: 'from-blue-100/80 to-blue-300/80',
          card: 'bg-black/10',
          text: 'text-gray-800'
        };
      case condition.includes('mist') || condition.includes('fog'):
        return {
          background: 'from-gray-400/80 to-gray-600/80',
          card: 'bg-white/10',
          text: 'text-white'
        };
      default:
        return {
          background: 'from-blue-400/80 to-blue-800/80',
          card: 'bg-white/10',
          text: 'text-white'
        };
    }
  };

  const theme = getWeatherTheme();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed transition-all duration-1000"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} backdrop-blur-sm transition-colors duration-500`}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className={`backdrop-blur-md ${theme.card} rounded-2xl p-6 shadow-lg border border-white/10`}>
            <header className="mb-8">
              <h1 className={`text-4xl font-bold ${theme.text} text-center mb-2`}>
                Weather Forecast
              </h1>
              <SearchBar onSearch={handleSearch} theme={theme} />
            </header>

            <main>
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} />
              ) : (
                <>
                  {weather && <CurrentWeather weather={weather} theme={theme} />}
                  {weather && <WeatherMap weather={weather} theme={theme} />}
                  {forecast && <Forecast forecast={forecast} theme={theme} />}
                </>
              )}
            </main>
          </div>
          
          <Footer theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default App;