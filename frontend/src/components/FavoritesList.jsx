import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export default function FavoritesList() {
    const { user, isAnonymous } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAnonymous || !user) return;

        const fetchFavorites = async () => {
            try {
                const res = await api.get(
                    `${process.env.REACT_APP_API_URL}/weather/favorites`
                );
                console.log('Fetched favorites:', { data: res.data });

                setFavorites(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user, isAnonymous]);

    if (isAnonymous) {
        return <div>Para usar favoritos, por favor inicia sesión.</div>;
    }
    if (loading) {
        return <div>Cargando favoritos...</div>;
    }
    if (error) {
        return <div>Error al cargar favoritos: {error}</div>;
    }

    return (
        <div style={{ marginBottom: '1rem' }}>
            <h2>Ciudades Favoritas</h2>
            {favorites.length === 0 ? (
                <p>No tienes ciudades favoritas.</p>
            ) : (
                <ul>
                    {favorites.map(({ id, city_name, country_code }) => (
                        <li key={id}>
                            {city_name}, {country_code}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
