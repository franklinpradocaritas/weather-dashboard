
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const HistoryContext = createContext({
    history: [],
    refreshHistory: () => Promise.resolve()
});

export const HistoryProvider = ({ children }) => {
    const { user, isAnonymous } = useContext(AuthContext);
    const [history, setHistory] = useState([]);

    const refreshHistory = useCallback(async () => {
        try {
            console.log("=======BEFORE API CALL - HistoryProvider - User:", user);
            const res = await api.get(`${process.env.REACT_APP_API_URL}/weather/history`);
            console.log("=======AFTER API CALL - HistoryProvider - Response:", res.data);
            setHistory(res.data);
        } catch (err) {
            console.error('Error loading history', err);
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
        <HistoryContext.Provider value={{ history, refreshHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};
