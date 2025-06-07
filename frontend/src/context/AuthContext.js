
// import { createContext, useCallback, useEffect, useState } from 'react';
// import api from '../services/api';

// export const AuthContext = createContext({
//     user: null,
//     isAnonymous: false,
//     login: () => { },
//     loginAsGuest: () => { },
//     logout: () => { },
//     register: () => { },
// });

// const ANONYMOUS_USER = 'ANONYMOUS_USER';
// const APP_USER = 'APP_USER';

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(() => {
//         const stored = localStorage.getItem(APP_USER);
//         return stored ? JSON.parse(stored) : null;
//     });

//     const [isAnonymous, setIsAnonymous] = useState(() => {
//         const guestFlag = localStorage.getItem(ANONYMOUS_USER);
//         return guestFlag === 'true';
//     });

//     const updateSession = useCallback((userData, anonFlag) => {
//         setUser(userData);
//         setIsAnonymous(anonFlag);
//         if (userData) localStorage.setItem(APP_USER, JSON.stringify(userData));
//         else localStorage.removeItem(APP_USER);
//         if (anonFlag) localStorage.setItem(ANONYMOUS_USER, 'true');
//         else localStorage.removeItem(ANONYMOUS_USER);
//     }, []);

//     useEffect(() => {
//         if (user) {
//             api.defaults.headers.common[process.env.USER_TOKEN_HEADER] = user.id;
//         } else {
//             delete api.defaults.headers.common[process.env.USER_TOKEN_HEADER];
//         }
//     }, [user]);

//     const login = useCallback(async ({ username }) => {
//         try {
//             const { data: existing } = await api.get(`${process.env.REACT_APP_API_URL}/admin/users`, {
//                 params: { username }
//             });
//             console.log("*********Login user data:", { existing });

//             let userData;
//             if (!existing && !existing.id) {
//                 throw new Error('User not exists');
//             }
//             updateSession(existing, false);
//             return existing;
//         } catch (err) {
//             throw err;
//         }
//     }, [updateSession]);

//     const register = useCallback(async (username) => {
//         try {
//             const { data: created } = await api.post(`${process.env.REACT_APP_API_URL}/admin/users`, username);
//             updateSession(created, false);
//             return created;
//         } catch (err) {
//             console.error('Error registering user', err);
//             throw err;
//         }
//     }, [updateSession]);

//     const loginAsGuest = useCallback(() => {
//         updateSession(null, true);
//     }, [updateSession]);

//     const logout = useCallback(() => {
//         updateSession(null, false);
//     }, [updateSession]);

//     const contextValue = {
//         user,
//         isAnonymous,
//         login,
//         loginAsGuest,
//         logout,
//         register
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


// frontend/src/context/AuthContext.jsx
import { createContext, useCallback, useEffect, useState } from 'react';
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

    const [loading, setLoading] = useState(true); // para saber si estamos recuperando al iniciar

    // Helper único para sincronizar estado y localStorage
    const updateSession = useCallback((userData, anonFlag) => {
        console.log("--------->>> UPDATE SESSION:", { userData, anonFlag });

        setUser(userData);
        setIsAnonymous(anonFlag);
        // if (userData) localStorage.setItem(APP_USER, JSON.stringify(userData));
        if (userData) localStorage.setItem(APP_USER, JSON.stringify(userData.id));
        else localStorage.removeItem(APP_USER);
        if (anonFlag) localStorage.setItem(ANONYMOUS_USER, 'true');
        else localStorage.removeItem(ANONYMOUS_USER);
    }, []);

    useEffect(() => {
        if (user) {
            api.defaults.headers.common[process.env.REACT_APP_USER_TOKEN_HEADER] = user.id;
        } else {
            delete api.defaults.headers.common[process.env.REACT_APP_USER_TOKEN_HEADER];
        }
    }, [user]);

    useEffect(() => {
        (async () => {
            const stored = localStorage.getItem(APP_USER);
            if (stored) {
                try {

                    const parsed = JSON.parse(stored);
                    // Suponemos stored tiene al menos { username }
                    const { data: fresh } = await api.get(`${process.env.REACT_APP_API_URL}/admin/users`, {
                        params: { userId: parsed }
                    });
                    console.log("001.BEFORE UPDATE SESSION:", { fresh, stored });

                    updateSession(fresh, false);
                } catch (err) {
                    alert("ERROR: USEEFFECT:", { stored, err });
                    // Si falla (usuario borrado o token expiró), limpiar sesión
                    console.log("002.BEFORE UPDATE SESSION:");
                    updateSession(null, false);
                }
            }
            setLoading(false);
        })();
    }, [updateSession]);

    const login = useCallback(async ({ username }) => {
        console.log("A.*********Login user:", { username });

        // const { data: existing } = await api.get(`${process.env.REACT_APP_API_URL}/admin/users/username`, {
        //     params: { username }
        // });
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
