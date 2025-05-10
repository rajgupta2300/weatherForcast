import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  theme: {
    text: string;
  };
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={`mt-8 text-center ${theme.text}/70 text-sm`}>
      <p className="mb-2">
        Weather data provided by{' '}
        <a 
          href="https://openweathermap.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`underline hover:${theme.text} transition-colors`}
        >
          OpenWeatherMap
        </a>
      </p>
      <div className="flex justify-center items-center space-x-2">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`hover:${theme.text} transition-colors`}
        >
          <Github size={16} />
        </a>
        <span>|</span>
        <p>&copy; {new Date().getFullYear()} Weather App</p>
      </div>
    </footer>
  );
};