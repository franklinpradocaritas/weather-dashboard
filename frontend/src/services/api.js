
import axios from 'axios';
import debounce from 'lodash.debounce';
import { toast } from 'react-toastify';
import { getCurrentTemperatureUnit } from '../context/TemperatureUnitContext';

export const APP_ERROR = 'app-error';
export const RATE_LIMIT_EVENT = 'rate-limit-event';
export const AUTH_EVENT = 'auth-event';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000
});

const notifyRateLimit = debounce(
    (message) => {
        toast.error(message ?? 'Too many request.');
        // window.dispatchEvent(new CustomEvent(RATE_LIMIT_EVENT, {
        //     detail: {
        //         message
        //     }
        // }));

        window.dispatchEvent(new CustomEvent(APP_ERROR, {
            detail: {
                category: RATE_LIMIT_EVENT,
                code: 429,
                message: message
            },
            bubbles: true,
            composed: true
        }));
    },
    1000,
    { leading: true, trailing: false }
);

api.interceptors.request.use(
    (config) => {
        const unit = getCurrentTemperatureUnit();
        const additionalParams = {
            units: unit // Temperature Unit
        };
        const existingParams = config.params || {};

        // Unimos los parámetros existentes con los nuevos
        config.params = {
            ...existingParams,
            ...additionalParams,
        };
        // if (stored) {
        //     const user = JSON.parse(stored);
        //     config.headers['x-user-token'] = "user.id";
        // }
        // console.log("*******Request Interceptor - User token header:", { params: config.params });
        // config.headers[process.env.REACT_APP_USER_TOKEN_HEADER] = "USER_TOKEN";
        return config;
    },
    (error) => {
        // toast.error('Error en la petición: ' + error.message);
        Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {

        console.log("--------------- AXIOS Interceptor ---------------", { error });

        const status = error.response?.status;
        const message = error.response?.data?.error;

        switch (status) {
            case 401:
                // history.push('/login')
                // toast.info('Sesión expirada, redirigiendo al login...');

                window.dispatchEvent(new CustomEvent(APP_ERROR, {
                    detail: {
                        category: AUTH_EVENT,
                        code: 401,
                        message: 'Expired Session'
                    }
                }));
                break;
            case 429:
                notifyRateLimit(message);
                break;
            default:
                window.dispatchEvent(new CustomEvent(APP_ERROR, {
                    detail: {
                        category: 'GENERAL',
                        code: 1,
                        message: error.message
                    }
                }));
                break;
        }
        // if (status === 429) {
        //     notifyRateLimit(message);
        // }

        // if (error.response?.status === 401) {
        //     // history.push('/login')
        //     // toast.info('Sesión expirada, redirigiendo al login...');
        // }
        // return Promise.reject(error);
    }
);

export default api;
