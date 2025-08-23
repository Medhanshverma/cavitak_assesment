const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export interface CityData {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export const fetchCitySuggestions = async (query: string): Promise<CityData[]> => {
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }

  if (query.length < 3) {
    return [];
  }

  const url = `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
};
