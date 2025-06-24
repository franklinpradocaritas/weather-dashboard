
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

export const HistoryContext = createContext({
    history: [],
    refreshHistory: () => Promise.resolve(),
    clearHistory: () => Promise.resolve()
});

export const HistoryProvider = ({ children }) => {
    const { user, isAnonymous } = useAuth();
    const [history, setHistory] = useState([]);

    const refreshHistory = useCallback(async () => {
        try {
            const res = await api.get(`${process.env.REACT_APP_API_URL}/weather/history`);
            setHistory(res.data);
        } catch (err) {
            console.error('Error loading history', err);
        }
    }, []);

    const clearHistory = useCallback(async () => {
        try {
            setHistory([]);
        } catch (err) {
            console.error('Error clearing history', err);
        }
    }, []);

    useEffect(() => {
        if (!isAnonymous && user) {
            refreshHistory();
        } else {
            setHistory([]);
        }
    }, [user, isAnonymous, refreshHistory]);

    return (
        <HistoryContext.Provider value={{ history, refreshHistory, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => useContext(HistoryContext);