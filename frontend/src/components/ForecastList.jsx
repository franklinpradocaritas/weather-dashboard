// frontend/src/components/ForecastList.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ForecastList({ city }) {
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) return;
        axios
            // .get(`${process.env.REACT_APP_API_URL}/weather/forecast/${city.id}`)
            .get(
                `${process.env.REACT_APP_API_URL}/weather/forecast/${city.name}`
            )
            .then((res) => {
                console.log('********Forecast data:', res.data);

                setForecast(res.data);
            })
            .catch((err) => setError(err.message));
    }, [city]);

    if (error) return <div>Error: {error}</div>;
    if (!forecast) return <div>Loading forecast...</div>;

    return (
        <div style={{ marginBottom: '1rem' }}>
            <h2>5-Day Forecast for {city.name}</h2>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
                {forecast &&
                    forecast.map((day) => (
                        <div
                            key={day.dt_txt}
                            style={{
                                border: '1px solid #ccc',
                                padding: '0.5rem',
                                minWidth: '150px',
                            }}
                        >
                            <p>
                                {new Date(day.dt * 1000).toLocaleDateString()}
                            </p>
                            <p>Temp: {day.main_temp} °C</p>
                            <p>main_feels_like: {day.main_feels_like} °C</p>
                            <p>
                                weather_description: {day.weather_description}{' '}
                            </p>
                            <p>weather_icon: {day.weather_icon}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
