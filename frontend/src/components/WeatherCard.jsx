// import { useEffect, useState } from 'react';
// import api from '../services/api';

// export default function WeatherCard({ city }) {
//     const [current, setCurrent] = useState(null);
//     const [error, setError] = useState(null);
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         if (!city) return;

//         api.get(`${process.env.REACT_APP_API_URL}/weather/current/${city.name}`)
//             .then((res) => setCurrent(res.data))
//             .catch((err) => setError(err.message));
//     }, [city]);

//     const handleSaveFavorite = async () => {
//         if (!current) return;
//         setSaving(true);
//         try {
//             // await axios.post(
//             await api.post(
//                 `${process.env.REACT_APP_API_URL}/weather/favorites`,
//                 {
//                     city_name: current.name,
//                     country_code: current.sys.country,
//                     city: current,
//                 }
//             );
//             alert(`${current.name} agregado a favoritos`);
//         } catch (err) {
//             alert('Error guardando favorito: ' + err.message);
//         } finally {
//             setSaving(false);
//         }
//     };

//     if (error) return <div>Error: {error}</div>;
//     if (!current) return <div>Search a city to see current weather.</div>;

//     return (
//         <div
//             style={{
//                 border: '1px solid #ccc',
//                 padding: '1rem',
//                 marginBottom: '1rem',
//             }}
//         >
//             <h2>
//                 {current.name}, {current.sys.country}
//             </h2>
//             <p>Temperature: {current.main.temp} °C</p>
//             <p>Humidity: {current.main.humidity}%</p>
//             {/* <p>Description: {current.weather[0].description}</p> */}
//             <button onClick={handleSaveFavorite} disabled={saving}>
//                 {saving ? 'Guardando...' : 'Guardar como favorito'}
//             </button>
//         </div>
//     );
// }

// frontend/src/components/WeatherCard.jsx
import { useContext, useEffect, useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import api from '../services/api';
import { formatShortDate, formatShortTime } from '../utils/TimeUtils';

export default function WeatherCard({ city }) {
    const { refreshFavorites } = useContext(FavoritesContext);
    const [current, setCurrent] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!city) return;
        api.get(`${process.env.REACT_APP_API_URL}/weather/current/${city.name}`)
            .then((r) => setCurrent(r.data))
            .catch(console.error);
    }, [city]);

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
            await refreshFavorites(); // ← Notifica al context
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleTime = (date) => {
        console.log('01.WEATHER TIME::', date);

        const dateObj = new Date(date * 1000);
        console.log('02.WEATHER TIME::', dateObj);
        return formatShortTime(dateObj);
    };

    const handleShortDate = (date) => {
        console.log('01.WEATHER SHORT DATE::', date);

        const dateObj = new Date(date * 1000);
        // return formatShortDate(dateObj);
        const shortDate = formatShortDate(dateObj);
        console.log('02.WEATHER SHORT DATE::', shortDate);
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

    if (!current) return <div>Busca una ciudad...</div>;
    return (
        <>
            {/* <div
                style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    marginBottom: '1rem',
                }}
            >
                <h2>
                    {current.name}, {current.sys.country}
                </h2>
                <p>Temperature: {current.main.temp} °C</p>
                <p>Humidity: {current.main.humidity}%</p>
                <button onClick={handleSaveFavorite} disabled={saving}>
                    {saving ? 'Guardando...' : 'Guardar como favorito'}
                </button>
            </div> */}
            <div className='card shadow-sm mb-4'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-start'>
                        {/* Título */}
                        <h5 className='card-title mb-0'>
                            {current.name}{' '}
                            <small className='text-muted'>
                                ({current.sys.country})
                            </small>
                        </h5>
                        {/* <button onClick={handleSaveFavorite} disabled={saving}>
                            {saving ? 'Guardando...' : 'Guardar como favorito'}
                        </button> */}
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
                        {/* <StarButtonYellow />
                        <StarButtonDefault /> */}
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
                                    {Math.round(current.main.temp)} °C
                                </h1>
                                <p className='mb-0 text-capitalize'>
                                    {current.weather[0].description}
                                </p>
                                <small className='text-muted'>
                                    Feels like{' '}
                                    {Math.round(current.main.feels_like)} °C
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
