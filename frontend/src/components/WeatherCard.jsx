import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useError } from '../context/ErrorContext';
import { useFavorites } from '../context/FavoritesContext';
import { useTemperatureUnit } from '../context/TemperatureUnitContext';
import api from '../services/api';
import { formatShortDate, formatShortTime } from '../utils/TimeUtils';
import TemperatureUnit from './atoms/TemperaturaUnit';

export default function WeatherCard({ city }) {
    const { refreshFavorites } = useFavorites();
    const { unit } = useTemperatureUnit();
    const [current, setCurrent] = useState(null);
    const [saving, setSaving] = useState(false);
    const { isAnonymous } = useAuth();
    const { errors } = useError();

    useEffect(() => {
        if (!city) return;
        // api.get(`${process.env.REACT_APP_API_URL}/weather/current/${city.name}`)
        //     .then((r) => setCurrent(r.data))
        //     .catch(console.error);

        api.get(`${process.env.REACT_APP_API_URL}/weather/current/${city.name}`)
            .then((r) => {
                setCurrent(r.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [city, unit]);

    const handleSaveFavorite = async () => {
        if (!current) return;
        setSaving(true);
        try {
            await api.post(
                `${process.env.REACT_APP_API_URL}/weather/favorites`,
                {
                    city_name: current.name,
                    country_code: current.sys.country,
                    city: current,
                }
            );
            await refreshFavorites();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleTime = (date) => {
        const dateObj = new Date(date * 1000);
        return formatShortTime(dateObj);
    };

    const handleShortDate = (date) => {
        const dateObj = new Date(date * 1000);
        const shortDate = formatShortDate(dateObj);
        return shortDate;
    };

    const StarButtonDefault = () => {
        return (
            <svg
                width='30'
                height='30'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
            >
                <polygon
                    points='12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9'
                    fill='none'
                    stroke='#4C4B51'
                    stroke-width='2'
                    stroke-linejoin='round'
                />
            </svg>
        );
    };

    const StarButtonDisabled = () => {
        return (
            <svg
                width='30'
                height='30'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
            >
                <polygon
                    points='12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9'
                    fill='none'
                    stroke='#B7BCC3'
                    stroke-width='2'
                    stroke-linejoin='round'
                />
            </svg>
        );
    };

    const StarButtonYellow = () => {
        return (
            <svg
                width='30'
                height='30'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
            >
                <polygon
                    points='12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9'
                    fill='none'
                    stroke='#EDA110'
                    stroke-width='2'
                    stroke-linejoin='round'
                />
            </svg>
        );
    };

    if (!current) return <div>City search...</div>;
    if (errors.length) {
        return (
            <div className='card shadow-sm mb-4'>
                <div className='card-body'>
                    Weather Error: {errors[0].message}
                </div>
            </div>
        );
    }
    return (
        <>
            <div className='card shadow-sm mb-4'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-start'>
                        <h5 className='card-title mb-0'>
                            {current.name}{' '}
                            <small className='text-muted'>
                                ({current.sys.country})
                            </small>
                        </h5>
                        {!isAnonymous && (
                            <>
                                {saving ? (
                                    <StarButtonDisabled />
                                ) : (
                                    <a
                                        href='#'
                                        onClick={handleSaveFavorite}
                                        disabled={saving}
                                    >
                                        <StarButtonDefault />
                                    </a>
                                )}
                            </>
                        )}
                    </div>

                    <div className='row mt-3'>
                        {/* Columna izquierda: icono y temperatura */}
                        <div className='col-md-4 d-flex align-items-center'>
                            <i
                                className='bi bi-circle-fill'
                                style={{
                                    fontSize: '3rem',
                                    color: '#f05e3b',
                                }}
                            ></i>
                            <div className='ms-3'>
                                <h1 className='display-4 mb-0'>
                                    {Math.round(current.main.temp)}{' '}
                                    <TemperatureUnit />
                                </h1>
                                <p className='mb-0 text-capitalize'>
                                    {current.weather[0].description}
                                </p>
                                <small className='text-muted'>
                                    Feels like{' '}
                                    {Math.round(current.main.feels_like)}{' '}
                                    <TemperatureUnit />
                                </small>
                            </div>
                        </div>

                        {/* Columna derecha: detalles */}
                        <div className='col-md-8'>
                            <div className='row'>
                                <div className='col-12 mb-2'>
                                    <p className='text-muted small mt-2'>
                                        {handleShortDate(current.dt)}
                                    </p>
                                </div>

                                <div className='col-6 mb-2'>
                                    <i className='bi bi-droplet-fill text-primary'></i>{' '}
                                    <strong>Humidity:</strong>{' '}
                                    {current.main.humidity}%
                                </div>
                                <div className='col-6 mb-2'>
                                    <i className='bi bi-wind text-secondary'></i>{' '}
                                    <strong>Wind:</strong> {current.wind.speed}{' '}
                                    m/s
                                </div>
                                <div className='col-6 mb-2'>
                                    <i className='bi bi-sunrise-fill text-warning'></i>{' '}
                                    <strong>Sunrise:</strong>{' '}
                                    {handleTime(current.sys.sunrise)}
                                </div>
                                <div className='col-6 mb-2'>
                                    <i className='bi bi-sunset-fill text-danger'></i>{' '}
                                    <strong>Sunset:</strong>{' '}
                                    {handleTime(current.sys.sunset)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
