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
      // Extract just the city name for the API call
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
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Weather Dashboard</h1>
      
      <SearchBar
        city={city}
        onCityChange={setCity}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && <ErrorMessage message={error} />}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}
