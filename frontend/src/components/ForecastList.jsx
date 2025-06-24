import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useError } from '../context/ErrorContext';
import { useTemperatureUnit } from '../context/TemperatureUnitContext';
import api from '../services/api';
import { formatShortDate } from '../utils/TimeUtils';
import TemperatureUnit from './atoms/TemperaturaUnit';

export default function ForecastList({ city }) {
    const [forecast, setForecast] = useState(null);
    const [customError, setCustomError] = useState(null);
    const { unit } = useTemperatureUnit();
    const { errors } = useError();

    useEffect(() => {
        if (!city) return;
        api
            // .get(`${process.env.REACT_APP_API_URL}/weather/forecast/${city.id}`)
            .get(
                `${process.env.REACT_APP_API_URL}/weather/forecast/${city.name}`
            )
            .then((res) => {
                setForecast(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [city, unit]);

    const handleShortDate = (date) => {
        const dateObj = new Date(date * 1000);
        const shortDate = formatShortDate(dateObj);
        return shortDate;
    };

    if (errors.length) {
        return (
            <div className='card shadow-sm mb-4'>
                <div className='card-body'>
                    Forecast Error: {errors[0].message}
                </div>
            </div>
        );
    }
    if (!forecast) return <div>Loading forecast...</div>;

    return (
        <div className='card shadow-sm mb-4'>
            <div className='card-body'>
                <h5 className='card-title mb-4'>5-Day Forecast</h5>
                <div className='row gx-3'>
                    {forecast.map((day, idx) => (
                        <div className='col text-center' key={idx}>
                            <div className='card h-100'>
                                <div className='card-body p-3'>
                                    <p className='card-text mb-2 fw-semibold'>
                                        {handleShortDate(day.dt)}
                                    </p>
                                    <i
                                        className={`${day.weather_icon} mb-2`}
                                        style={{ fontSize: '2rem' }}
                                    ></i>
                                    <h6 className='mb-1'>
                                        {Math.round(day.main_temp)}
                                        <TemperatureUnit />
                                    </h6>
                                    <p className='text-muted small mb-0 text-capitalize'>
                                        {day.weather_description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
