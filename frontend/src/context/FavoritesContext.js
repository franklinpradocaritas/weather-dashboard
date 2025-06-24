import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext({
    favorites: [],
    refreshFavorites: () => Promise.resolve(),
});

export const FavoritesProvider = ({ children }) => {
    const { user, isAnonymous } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    const refreshFavorites = useCallback(async () => {
        try {
            const res = await api.get(`${process.env.REACT_APP_API_URL}/weather/favorites`);
            setFavorites(res.data);
        } catch (err) {
            console.error('Error loading favorites', err);
        }
    }, []);

    useEffect(() => {
        if (!isAnonymous && user) {
            refreshFavorites();
        }
        else {
            setFavorites([])
        };
    }, [user, isAnonymous, refreshFavorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, refreshFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);