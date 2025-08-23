import { WeatherData } from '@/types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string, iconCode: string) => {
  const iconMap: { [key: string]: string } = {
    '01d': '☀️', //clear sky day
    '01n': '🌙', //clear sky night
    '02d': '⛅', //few clouds day
    '02n': '☁️', //few clouds night night
    '03d': '☁️', //scattered clouds
    '03n': '☁️', //scattered clouds night
    '04d': '☁️', //broken clouds
    '04n': '☁️', //broken clouds night
    '09d': '🌧️', //shower rain
    '09n': '🌧️', //shower rain night
    '10d': '🌦️', //rain day
    '10n': '🌧️', //rain night
    '11d': '⛈️', //thunderstorm
    '11n': '⛈️', //thunderstorm night
    '13d': '❄️', //snow
    '13n': '❄️', //snow night
    '50d': '🌫️', //mist
    '50n': '🌫️', //mist night
  };
  
  return iconMap[iconCode] || '🌤️'; //default
};

//Function for local time
const getLocalTime = (timezone: number) => {
  const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
  const localTime = new Date(utcTime + (timezone * 1000));
  
  return localTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

//Function for local date
const getLocalDate = (timezone: number) => {
  const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
  const localTime = new Date(utcTime + (timezone * 1000));
  
  return localTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
};

// Function to determine if it is day or night
const getDayNightStatus = (currentTime: number, sunrise: number, sunset: number, timezone: number) => {
  const localCurrentTime = currentTime + timezone;
  const localSunrise = sunrise + timezone;
  const localSunset = sunset + timezone;
  
  return localCurrentTime >= localSunrise && localCurrentTime < localSunset ? 'day' : 'night';
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  const weatherIcon = getWeatherIcon(weather.weather[0].main, weather.weather[0].icon);
  const localTime = getLocalTime(weather.timezone);
  const localDate = getLocalDate(weather.timezone);
  const dayNightStatus = getDayNightStatus(weather.dt, weather.sys.sunrise, weather.sys.sunset, weather.timezone);
  
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '25px', 
      borderRadius: '15px',
      marginTop: '25px',
      color: '#2c3e50',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid #e1e8ed'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.3)',
        zIndex: 1
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px' 
        }}>
          <div>
            <h2 style={{ 
              margin: '0 0 5px 0', 
              fontSize: '24px',
              fontWeight: '600'
            }}>
              {weather.name}
            </h2>
            <p style={{ 
              margin: '0', 
              fontSize: '14px', 
              opacity: 0.8,
              textTransform: 'capitalize'
            }}>
              {weather.weather[0].description}
            </p>
          </div>
          <div style={{ 
            fontSize: '48px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}>
            {weatherIcon}
          </div>
        </div>

        {/* Temperature */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '25px' 
        }}>
          <span style={{ 
            fontSize: '54px', 
            fontWeight: '300',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {Math.round(weather.main.temp)}°
          </span>
          <span style={{ 
            fontSize: '24px', 
            opacity: 0.8,
            marginLeft: '5px'
          }}>
            C
          </span>
        </div>

        {/* Local Time and Day/Night Status */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: '600',
            marginBottom: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span>{dayNightStatus === 'day' ? '☀️' : '🌙'}</span>
            <span>{localTime}</span>
          </div>
          <div style={{ 
            fontSize: '14px', 
            opacity: 0.8,
            marginBottom: '5px'
          }}>
            {localDate}
          </div>
          <div style={{ 
            fontSize: '12px', 
            opacity: 0.7,
            textTransform: 'capitalize'
          }}>
            {dayNightStatus === 'day' ? 'Day-time' : 'Night-time'} in {weather.name}
          </div>
        </div>

        {/* Weather Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '15px',
          marginTop: '20px'
        }}>
          <div style={{ 
            textAlign: 'center',
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ 
              fontSize: '20px', 
              marginBottom: '5px' 
            }}>💧</div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '600',
              marginBottom: '2px' 
            }}>
              {weather.main.humidity}%
            </div>
            <div style={{ 
              fontSize: '12px', 
              opacity: 0.8 
            }}>
              Humidity
            </div>
          </div>

          <div style={{ 
            textAlign: 'center',
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ 
              fontSize: '20px', 
              marginBottom: '5px' 
            }}>💨</div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '600',
              marginBottom: '2px' 
            }}>
              {weather.wind.speed} m/s
            </div>
            <div style={{ 
              fontSize: '12px', 
              opacity: 0.8 
            }}>
              Wind Speed
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
