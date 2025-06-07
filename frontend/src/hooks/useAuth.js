// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    return useContext(AuthContext);
};
// export const useIsAuthenticated = () => {
//     const { isAnonymous } = useAuth();
//     return !isAnonymous;
// };
// export const useUser = () => {
//     const { user } = useAuth();
//     return user;
// };
// export const useLogin = () => {
//     const { login } = useAuth();
//     return login;
// };
// export const useLoginAsGuest = () => {
//     const { loginAsGuest } = useAuth();
//     return loginAsGuest;
// };
// export const useLogout = () => {
//     const { logout } = useAuth();
//     return logout;
// }