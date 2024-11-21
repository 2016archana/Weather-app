import "./WeatherInfo.css";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirIcon from '@mui/icons-material/Air';

export default function WeatherInfo({ data }) {
  const capitalizedWeather = data.weather
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="WeatherInfo">
      <div className="location-info">
        <LocationOnIcon />
        <h2>{data.city}, {data.country}</h2>
      </div>

      <div className="main-temp">
        <ThermostatIcon className="temp-icon" />
        <span className="temp-value">{Math.round(data.temp)}°C</span>
        <span className="weather-desc">{capitalizedWeather}</span>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <CompareArrowsIcon />
          <div className="detail-info">
            <span className="label">Min/Max</span>
            <span className="value">
              {Math.round(data.tempMin)}°C / {Math.round(data.tempMax)}°C
            </span>
          </div>
        </div>

        <div className="detail-item">
          <WaterDropIcon />
          <div className="detail-info">
            <span className="label">Humidity</span>
            <span className="value">{data.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <AirIcon />
          <div className="detail-info">
            <span className="label">Feels Like</span>
            <span className="value">{Math.round(data.feelsLike)}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}