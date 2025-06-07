// import axios from 'axios';
// import { useEffect, useState } from 'react';

// export default function WeatherCard({ city }) {
//     const [current, setCurrent] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         console.log(
//             '========>> WeatherCard useEffect triggered with city:',
//             city
//         );

//         if (!city) return;
//         axios
//             // .get(`${process.env.REACT_APP_API_URL}/weather/current/${city.id}`)
//             .get(
//                 `${process.env.REACT_APP_API_URL}/weather/current/${city.name}`
//             )
//             .then((res) => setCurrent(res.data))
//             .catch((err) => setError(err.message));
//     }, [city]);

//     if (error) return <div>Error: {error}</div>;
//     if (!current) return <div>Loading current weather...</div>;

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
//             <p>Description: {current.weather[0].description}</p>
//         </div>
//     );
// }

//==========================================================

// frontend/src/components/WeatherCard.jsx
// import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function WeatherCard({ city }) {
    const [current, setCurrent] = useState(null);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!city) return;
        // axios
        // axios
        //     .get(
        //         `${process.env.REACT_APP_API_URL}/weather/current/${city.name}`
        //     )
        api.get(`${process.env.REACT_APP_API_URL}/weather/current/${city.name}`)
            .then((res) => setCurrent(res.data))
            .catch((err) => setError(err.message));
    }, [city]);

    const handleSaveFavorite = async () => {
        if (!current) return;
        setSaving(true);
        try {
            // await axios.post(
            await api.post(
                `${process.env.REACT_APP_API_URL}/weather/favorites`,
                {
                    city_name: current.name,
                    country_code: current.sys.country,
                    city: current,
                }
            );
            alert(`${current.name} agregado a favoritos`);
        } catch (err) {
            alert('Error guardando favorito: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!current) return <div>Search a city to see current weather.</div>;

    return (
        <div
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
            {/* <p>Description: {current.weather[0].description}</p> */}
            <button onClick={handleSaveFavorite} disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar como favorito'}
            </button>
        </div>
    );
}
