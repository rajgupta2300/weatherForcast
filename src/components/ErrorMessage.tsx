import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-white text-center">
      <AlertTriangle size={48} className="text-red-300 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Oops!</h2>
      <p>{message}</p>
      <p className="mt-4 text-sm opacity-80">
        Please check your connection or try searching for a different location.
      </p>
    </div>
  );
};