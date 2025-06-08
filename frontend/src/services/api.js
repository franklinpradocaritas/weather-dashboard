
import axios from 'axios';
// import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000
});

api.interceptors.request.use(
    (config) => {
        // const stored = localStorage.getItem('currentUser');
        // if (stored) {
        //     const user = JSON.parse(stored);
        //     config.headers['x-user-token'] = "user.id";
        // }
        console.log("*******Request Interceptor - User token header:", `${process.env.REACT_APP_USER_TOKEN_HEADER}`);

        // config.headers[process.env.REACT_APP_USER_TOKEN_HEADER] = "USER_TOKEN"; // Reemplaza USER_TOKEN con el token real del usuario autenticado
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
        const msg = error.response
            ? `Error ${error.response.status}: ${error.response.data?.error || error.response.statusText}`
            : `Network Error: ${error.message}`;

        // toast.error(msg);
        // Por ejemplo, si recibes 401, rediriges al login
        if (error.response?.status === 401) {
            // history.push('/login')
            // alert('Unexpected error. Please login again.');
            // toast.info('Sesión expirada, redirigiendo al login...');
        }
        return Promise.reject(error);
    }
);

export default api;
