import { WeatherData } from '@/types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
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
  );
}
