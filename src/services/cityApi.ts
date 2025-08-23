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
    console.warn('API key is not configured for city suggestions');
    return [];
  }

  if (query.length < 3) {
    return [];
  }

  const url = `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      // Handle specific error cases silently for city suggestions
      if (response.status === 401 || response.status === 402 || response.status === 403) {
        console.warn('API authentication issue for city suggestions');
        return [];
      } else if (response.status === 404) {
        console.warn('No cities found for query:', query);
        return [];
      } else if (response.status === 429) {
        console.warn('Rate limit exceeded for city suggestions');
        return [];
      }
      return [];
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
};
