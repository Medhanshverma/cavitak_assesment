import { WeatherData, ApiError } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  console.log('API_KEY:', API_KEY ? 'Found' : 'Missing');
  
  if (!API_KEY) {
    throw new Error('Weather service is temporarily unavailable. Please try again later.');
  }

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  console.log('API URL:', url);
  
  const response = await fetch(url);
  console.log('Response status:', response.status);
  
  if (!response.ok) {
    let errorData: ApiError;
    try {
      errorData = await response.json();
      console.log('Error data:', errorData);
    } catch (e) {
      errorData = { message: 'Unknown error' };
    }

    if (response.status === 401) {
      throw new Error('⚠️\nSomething went wrong\nWeather service is temporarily unavailable. Please try again later.');
    } else if (response.status === 402) {
      throw new Error('⚠️\nSomething went wrong\nWeather service is temporarily unavailable. Please try again later.');
    } else if (response.status === 403) {
      throw new Error('⚠️\nSomething went wrong\nWeather service is temporarily unavailable. Please try again later.');
    } else if (response.status === 404) {
      throw new Error('🔍\nCity not found\nPlease check the spelling and try again.');
    } else if (response.status === 429) {
      throw new Error('⏰\nToo many requests\nPlease wait a moment and try again.');
    } else {
      throw new Error('⚠️\nSomething went wrong\nUnable to fetch weather data. Please try again.');
    }
  }
  
  const data = await response.json();
  console.log('Weather data:', data);
  return data;
};
