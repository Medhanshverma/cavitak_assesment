'use client';

import { useState } from 'react';
import { fetchWeatherData } from '@/services/weatherApi';
import { WeatherData } from '@/types/weather';

export default function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    console.log('Starting search for:', city);
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await fetchWeatherData(city);
      console.log('Received weather data:', data);
      setWeather(data);
    } catch (err) {
      console.log('Error occurred:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Weather Dashboard</h1>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name (e.g., London, Tokyo)"
          style={{ 
            padding: '12px', 
            width: '100%', 
            marginBottom: '15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px'
          }}
        />
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

      {error && (
        <div style={{ 
          color: '#d32f2f', 
          backgroundColor: '#ffebee', 
          padding: '15px', 
          borderRadius: '6px',
          marginTop: '20px',
          border: '1px solid #ffcdd2'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {weather && (
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '20px',
          border: '1px solid #dee2e6'
        }}>
          <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>{weather.name}</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            <p><strong>Temperature:</strong> {Math.round(weather.main.temp)}°C</p>
            <p><strong>Condition:</strong> {weather.weather[0].description}</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
