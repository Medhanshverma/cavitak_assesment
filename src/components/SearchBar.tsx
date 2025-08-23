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

    const timeoutId = setTimeout(fetchSuggestions, 300); //For debounce
    return () => clearTimeout(timeoutId);
  }, [city]);

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
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Search for a city..."
          style={{ 
            padding: '16px 50px 16px 20px', 
            width: '100%', 
            marginBottom: '20px',
            border: '2px solid #e1e5e9',
            borderRadius: '50px',
            fontSize: '16px',
            color: '#333',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            backgroundColor: 'white'
          }}
          autoComplete="off"
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.boxShadow = '0 4px 20px rgba(102,126,234,0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e1e5e9';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
          }}
        />
        
        {/* Search Icon */}
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '20px',
          color: '#667eea',
          pointerEvents: 'none'
        }}>
          🔍
        </div>
      </div>
      
      {/* Dropdown for city suggestions */}
      {showSuggestions && (
        <div 
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '60px',
            left: '0',
            right: '0',
            backgroundColor: 'white',
            border: '2px solid #e1e5e9',
            borderRadius: '15px',
            maxHeight: '250px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            marginBottom: '20px'
          }}
        >
          {loadingSuggestions ? (
            <div style={{ 
              padding: '20px', 
              color: '#666',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <span>⏳</span> Loading cities...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.name}-${suggestion.country}-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '15px 20px',
                  cursor: 'pointer',
                  borderBottom: index < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                  backgroundColor: 'white',
                  transition: 'background-color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <div style={{ fontSize: '18px' }}>📍</div>
                <div>
                  <div style={{ 
                    fontWeight: '500', 
                    fontSize: '15px',
                    color: '#333'
                  }}>
                    {suggestion.name}
                  </div>
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#555', 
                    marginTop: '2px' 
                  }}>
                    {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                  </div>
                </div>
              </div>
            ))
          ) : city.length >= 3 ? (
            <div style={{ 
              padding: '20px', 
              color: '#666',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>😞</span>
              No cities found
            </div>
          ) : null}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          padding: '16px 32px',
          background: loading 
            ? 'linear-gradient(45deg, #ccc, #ddd)' 
            : 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          width: '100%',
          transition: 'all 0.3s ease',
          boxShadow: loading 
            ? 'none' 
            : '0 6px 20px rgba(102,126,234,0.3)',
          transform: loading ? 'none' : 'translateY(0)',
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(102,126,234,0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102,126,234,0.3)';
          }
        }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
            Searching...
          </span>
        ) : (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>🌤️</span> Get Weather
          </span>
        )}
      </button>
    </form>
  );
}
