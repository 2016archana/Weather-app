import { useState } from "react";
import "./SearchBox.css";
import WeatherInfo from "./WeatherInfo";

export default function SearchBox() {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = import.meta.env.VITE_API_KEY;
    
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getWeatherInfo = async (e) => {
        e.preventDefault();
        
        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            if (data.cod === "404") {
                setError("City not found. Please check the spelling and try again.");
                setWeatherData(null);
            } else if (data.cod === 200) {
                setWeatherData({
                    city: data.name,
                    country: data.sys.country,
                    temp: data.main.temp,
                    feelsLike: data.main.feels_like,
                    humidity: data.main.humidity,
                    weather: data.weather[0].description,
                    tempMin: data.main.temp_min,
                    tempMax: data.main.temp_max
                });
                setCity(""); // Clear input after successful search
            }
        } catch (err) {
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h1>Weather Forecast</h1>
            <form onSubmit={getWeatherInfo} className="search-form">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name..."
                    className="search-input"
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    className="search-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {weatherData && <WeatherInfo data={weatherData} />}
        </div>
    );
}
