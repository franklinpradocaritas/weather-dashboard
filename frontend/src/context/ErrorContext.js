import { createContext, useContext, useEffect, useState } from 'react';
import { APP_ERROR } from '../services/api';

export const ErrorContext = createContext({
    errors: [],
    clearErrors: () => { }
});

export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     const handler = (e) => setErrors(e.detail.message);
    //     window.addEventListener(RATE_LIMIT_EVENT, handler);
    //     return () => window.removeEventListener(RATE_LIMIT_EVENT, handler);
    // }, []);

    useEffect(() => {
        const handler = (e) => {
            console.log("ERROR PVIDER:::", { detail: e.detail });

            const { category, message, code } = e.detail || {};
            setErrors((prev) => [
                ...prev.filter(err => err.category !== category),
                { category, message, code, timestamp: Date.now() }
            ]);
        };

        window.addEventListener(APP_ERROR, handler);
        return () => window.removeEventListener(APP_ERROR, handler);
    }, []);

    const clearErrors = () => setErrors([]);

    return (
        <ErrorContext.Provider value={{ errors, clearErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);