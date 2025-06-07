
import axios from 'axios';

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
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Por ejemplo, si recibes 401, rediriges al login
        if (error.response?.status === 401) {
            // history.push('/login')
            alert('Unexpected error. Please login again.');
        }
        return Promise.reject(error);
    }
);

export default api;
