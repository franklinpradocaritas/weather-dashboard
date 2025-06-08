import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext({
    favorites: [],
    refresh: () => Promise.resolve(),
});

export const FavoritesProvider = ({ children }) => {
    const { user, isAnonymous } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    const refreshFavorites = useCallback(async () => {
        // console.log("---AAA.refreshFavorites:");
        try {
            // console.log("---BBB.refreshFavorites:");
            const res = await api.get(`${process.env.REACT_APP_API_URL}/weather/favorites`);
            // console.log("---CCC.refreshFavorites:");
            setFavorites(res.data);
            // console.log("---DDD.refreshFavorites:");
        } catch (err) {
            console.error('Error loading favorites', err);
        }
    }, []);

    useEffect(() => {
        console.log("--01.USE EFFECT - FAVORITES PROVIDER");

        if (!isAnonymous && user) {
            console.log("--02.USE EFFECT - BEFORE REFRESH FAVORITES");
            refreshFavorites();
        }
        else {
            console.log("--03.USE EFFECT - BEFORE SET FAVORITES");
            setFavorites([])
        };
        console.log("--04.END USE EFFECT - FAVORITES PROVIDER");
    }, [user, isAnonymous, refreshFavorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, refreshFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};
