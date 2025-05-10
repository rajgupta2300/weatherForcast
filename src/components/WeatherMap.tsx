import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import { CurrentWeatherData } from '../types/weather';

// Fix for default marker icon
const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface WeatherMapProps {
  weather: CurrentWeatherData;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ weather }) => {
  const position: [number, number] = [weather.coord.lat, weather.coord.lon];

  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-lg backdrop-blur-sm bg-white/10">
      <MapContainer 
        center={position} 
        zoom={10} 
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={defaultIcon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold">{weather.name}</h3>
              <p>{Math.round(weather.main.temp)}°C</p>
              <p>{weather.weather[0].description}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};