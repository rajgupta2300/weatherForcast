import React, { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  theme: {
    text: string;
    card: string;
  };
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, theme }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative max-w-md mx-auto mt-4"
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className={`w-full py-3 pl-4 pr-12 rounded-full ${theme.card} backdrop-blur-sm border border-white/30 ${theme.text} placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all`}
        />
        <button
          type="submit"
          className={`absolute right-2 p-2 ${theme.text}/80 hover:${theme.text} rounded-full hover:bg-white/10 transition-all`}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};