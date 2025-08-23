'use client';

import { useState } from 'react';
import { fetchWeatherData } from '@/services/weatherApi';
import { WeatherData } from '@/types/weather';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ErrorMessage from '@/components/ErrorMessage';

export default function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!city.trim()) return;

    console.log('Starting search for:', city);
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const cityName = city.split(',')[0].trim();
      const data = await fetchWeatherData(cityName);
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
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'fixed',
        top: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        position: 'fixed',
        bottom: '20%',
        left: '5%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div style={{ 
        maxWidth: '500px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          paddingTop: '40px'
        }}>
          <h1 style={{ 
            fontSize: '42px',
            fontWeight: '700',
            margin: '0 0 10px 0',
            color: '#000',
            textShadow: '0 2px 4px rgba(37, 36, 36, 0.1)',
          }}>
            ☀️ Cavitak Horizon
          </h1>
          <p style={{ 
            fontSize: '18px',
            color: 'rgba(255,255,255,0.8)',
            margin: '0',
            fontWeight: '300'
          }}>
            Discover weather conditions around the world
          </p>
        </div>

        {/* Main Content Card */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '25px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <SearchBar
            city={city}
            onCityChange={setCity}
            onSearch={handleSearch}
            loading={loading}
          />

          {error && <ErrorMessage message={error} />}

          {weather && <WeatherCard weather={weather} />}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '14px'
        }}>
          Made with ❤️ for Cavitak
        </div>
      </div>
    </div>
  );
}
