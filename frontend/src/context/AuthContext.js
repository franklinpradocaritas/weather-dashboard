import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import api from '../services/api';

export const AuthContext = createContext({
    user: null,
    isAnonymous: false,
    login: () => { },
    register: () => { },
    loginAsGuest: () => { },
    logout: () => { },
});

const APP_USER = 'APP_USER';
const ANONYMOUS_USER = 'ANONYMOUS_USER';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem(APP_USER);
        return stored ? JSON.parse(stored) : null;
    });

    const [isAnonymous, setIsAnonymous] = useState(() => {
        const guestFlag = localStorage.getItem(ANONYMOUS_USER);
        return guestFlag === 'true';
    });

    const [loading, setLoading] = useState(true);

    const updateSession = useCallback((userData, anonFlag) => {
        console.log("--------->>> UPDATE SESSION:", { userData, anonFlag });
        setUser(userData);
        setIsAnonymous(anonFlag);
        // if (userData) localStorage.setItem(APP_USER, JSON.stringify(userData));
        if (userData) {
            localStorage.setItem(APP_USER, JSON.stringify(userData.id));
            setHeader(userData);
        }
        else {
            localStorage.removeItem(APP_USER);
            removeHeader();
        }
        if (anonFlag) {
            localStorage.setItem(ANONYMOUS_USER, 'true');
        }
        else {
            localStorage.removeItem(ANONYMOUS_USER);
        }
    }, []);

    const setHeader = (user) => {
        api.defaults.headers.common[process.env.REACT_APP_USER_TOKEN_HEADER] = user.id;
    }

    const removeHeader = () => {
        delete api.defaults.headers.common[process.env.REACT_APP_USER_TOKEN_HEADER];
    }

    useEffect(() => {
        console.log("--------->>> USE-EFFECTS - AuthProvider -  SET API HEADER:", { user });

        if (user) {
            // api.defaults.headers.common[process.env.REACT_APP_USER_TOKEN_HEADER] = user.id;
            setHeader(user);
            console.log("HEADER:", { common_headers: api.defaults.headers.common });
        } else {
            // delete api.defaults.headers.common[process.env.REACT_APP_USER_TOKEN_HEADER];
            removeHeader();
        }
    }, [user]);

    useEffect(() => {
        (async () => {
            const stored = localStorage.getItem(APP_USER);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    const { data: fresh } = await api.get(`${process.env.REACT_APP_API_URL}/admin/users/${parsed}`);
                    updateSession(fresh, false);
                } catch (err) {
                    updateSession(null, false);
                }
            }
            setLoading(false);
        })();
    }, [updateSession]);

    const login = useCallback(async ({ username }) => {
        console.log("A.*********Login user:", { username });

        const { data: existing } = await api.get(`${process.env.REACT_APP_API_URL}/admin/users/username/${username}`);
        console.log("B.*********Login user data:", { existing });

        if (!existing && !existing.id) {
            throw new Error('User not exists');
        }
        console.log("C.*********");

        console.log("003.BEFORE UPDATE SESSION:");
        updateSession(existing, false);
        console.log("D.*********");
        return existing;
    }, [updateSession]);

    // register: crea usuario en backend
    const register = useCallback(async (username) => {
        const { data: created } = await api.post(`${process.env.REACT_APP_API_URL}/admin/users`, username);
        console.log("004.BEFORE UPDATE SESSION:");
        updateSession(created, false);
        return created;
    }, [updateSession]);

    const loginAsGuest = useCallback(() => {
        console.log("005.BEFORE UPDATE SESSION:");
        updateSession(null, true);
    }, [updateSession]);

    const logout = useCallback(() => {
        console.log("006.BEFORE UPDATE SESSION:");
        updateSession(null, false);
    }, [updateSession]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAnonymous,
            login,
            register,
            loginAsGuest,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
