import { WeatherData, ApiError } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  console.log('API_KEY:', API_KEY ? 'Found' : 'Missing');
  
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  console.log('API URL:', url);
  
  const response = await fetch(url);
  console.log('Response status:', response.status);
  
  if (!response.ok) {
    const errorData: ApiError = await response.json();
    console.log('Error data:', errorData);
    throw new Error(errorData.message || 'Failed to fetch weather data');
  }
  
  const data = await response.json();
  console.log('Weather data:', data);
  return data;
};
