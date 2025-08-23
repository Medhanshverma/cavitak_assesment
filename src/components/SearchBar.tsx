'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchCitySuggestions, CityData } from '@/services/cityApi';

interface SearchBarProps {
  city: string;
  onCityChange: (city: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchBar({ city, onCityChange, onSearch, loading }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isSelectingFromDropdown = useRef(false);

  //city fetch logic with search implement **Done
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length >= 3 && !isSelectingFromDropdown.current) {
        setLoadingSuggestions(true);
        try {
          const suggestions = await fetchCitySuggestions(city);
          setSuggestions(suggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setLoadingSuggestions(false);
        }
      } else if (!isSelectingFromDropdown.current) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [city]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isSelectingFromDropdown.current = false;
    onCityChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: CityData) => {
    const cityName = suggestion.state 
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    
    isSelectingFromDropdown.current = true;
    onCityChange(cityName);
    setShowSuggestions(false);
    
    setTimeout(() => {
      isSelectingFromDropdown.current = false;
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name (e.g., London, Tokyo)"
        style={{ 
          padding: '12px', 
          width: '100%', 
          marginBottom: '15px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '16px'
        }}
        autoComplete="off"
      />
      
      {/* Dropdown for city suggestions */}
      {showSuggestions && (
        <div 
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '45px',
            left: '0',
            right: '0',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '6px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {loadingSuggestions ? (
            <div style={{ padding: '12px', color: '#666' }}>Loading cities...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.name}-${suggestion.country}-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
                  backgroundColor: 'white'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <div style={{ fontWeight: '500' }}>
                  {suggestion.name}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                </div>
              </div>
            ))
          ) : city.length >= 3 ? (
            <div style={{ padding: '12px', color: '#666' }}>No cities found</div>
          ) : null}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          padding: '12px 24px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          width: '100%'
        }}
      >
        {loading ? 'Searching...' : 'Get Weather'}
      </button>
    </form>
  );
}
