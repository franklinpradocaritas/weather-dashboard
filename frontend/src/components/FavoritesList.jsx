// import { useContext } from 'react';
// import { FavoritesContext } from '../context/FavoritesContext';

// export default function FavoritesList() {
//     const { favorites } = useContext(FavoritesContext);

//     if (favorites.length === 0) {
//         return <div>No tienes favoritos aún.</div>;
//     }
//     return (
//         <div>
//             <h2>Favoritos</h2>
//             <ul>
//                 {favorites.map((f) => (
//                     <li key={f.id}>
//                         {f.city_name}, {f.country_code}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// src/components/FavoritesList.jsx
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import api from '../services/api';

export default function FavoritesList() {
    const { favorites, refreshFavorites } = useContext(FavoritesContext);
    const [saving, setSaving] = useState(false);

    const handleRemoveFavorite = async (id) => {
        console.log('---REMOVE FAVORITE::', { id });

        if (!id) return;
        setSaving(true);
        try {
            await api.delete(
                `${process.env.REACT_APP_API_URL}/weather/favorites/${id}`
            );
            await refreshFavorites(); // ← Notifica al context
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='card shadow-sm mb-4 h-100'>
            <div className='card-body'>
                <div className='d-flex align-items-center mb-4'>
                    <i className='bi bi-star-fill text-warning me-2'></i>
                    <h5 className='mb-0'>Favorite Cities</h5>
                </div>
                {favorites.length === 0 ? (
                    <p className='text-muted mb-0'>
                        No favorite cities yet. Star a city to add it here.
                    </p>
                ) : (
                    <ul className='list-group list-group-flush'>
                        {favorites.map(({ id, city_name, country_code }) => (
                            <li
                                key={id}
                                className='list-group-item d-flex justify-content-between align-items-center'
                            >
                                <span>
                                    {city_name}, {country_code}
                                </span>
                                <button
                                    className='btn btn-link btn-sm text-danger p-0'
                                    onClick={async () => {
                                        await handleRemoveFavorite(id);
                                    }}
                                    disabled={saving}
                                >
                                    <i className='bi bi-x-circle-fill'></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
