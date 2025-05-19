'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedValue } from '@/app/hooks/useDebounce';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
}

export default function SearchBar({ 
  placeholder = "Digite sua busca...", 
  className = "",
  onSearch,
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 300);
  const router = useRouter();

  // Busca instantânea quando o valor debounced muda
  useEffect(() => {
    if (debouncedQuery && onSearch) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }, [query, router]);

  const handleClear = useCallback(() => {
    setQuery('');
    if (onSearch) onSearch('');
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex items-center">
        {/* Ícone de busca */}
        <div className="absolute left-3 text-gray-400">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
            />
          </svg>
        </div>

        {/* Input de busca */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            w-full px-10 py-3 pr-24
            border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all duration-200
            ${isFocused ? 'border-blue-500' : 'border-gray-300'}
          `}
        />

        {/* Botão de limpar */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 text-gray-400 hover:text-gray-600"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}

        {/* Botão de buscar */}
        <button
          type="submit"
          className="absolute right-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Buscar
        </button>
      </div>

      {/* Indicador de busca ativa */}
      {debouncedQuery && (
        <div className="absolute top-full mt-1 text-sm text-gray-500">
          Buscando por: "{debouncedQuery}"
        </div>
      )}
    </form>
  );
}