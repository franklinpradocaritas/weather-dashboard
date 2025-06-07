// // import useAuth from '@/hooks/useAuth';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// const DashboardPage = () => {
//     const { user, isAnonymous, logout } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user && !isAnonymous) {
//             navigate('/login');
//         }
//     }, [user, isAnonymous, navigate]);

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <h1>Dashboard</h1>

//             {user ? (
//                 <p>
//                     Hola, <strong>{user.name}</strong> (logueado).
//                 </p>
//             ) : (
//                 <p>Estás navegando como invitado.</p>
//             )}

//             <button
//                 onClick={() => {
//                     logout();
//                     navigate('/login');
//                 }}
//                 style={styles.logoutButton}
//             >
//                 Cerrar sesión
//             </button>

//             {/* Aquí iría el contenido real de tu “dashboard” */}
//             <p>
//                 Esta es una página protegida que solo se ve si estás autenticado
//                 o como invitado.
//             </p>
//         </div>
//     );
// };

// export default DashboardPage;

// const styles = {
//     logoutButton: {
//         marginTop: '12px',
//         padding: '8px',
//         fontSize: '14px',
//         borderRadius: '4px',
//         border: 'none',
//         backgroundColor: '#f44336',
//         color: 'white',
//         cursor: 'pointer',
//     },
// };

//=======================================================================

// import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import FavoritesList from '../components/FavoritesList';
import ForecastList from '../components/ForecastList';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherHistory from '../components/WeatherHistory';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
    const { user, isAnonymous, logout } = useAuth();

    const [selectedCity, setSelectedCity] = useState(null);

    // Opcional: si quieres que al recargar use la última ciudad:
    useEffect(() => {
        const last = localStorage.getItem('lastCity');
        if (last) setSelectedCity({ name: last });
    }, []);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user && !isAnonymous) {
    //         navigate('/login');
    //     }
    // }, [user, isAnonymous, navigate]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Dashboard</h1>
            {user ? (
                <p>
                    Hola, <strong>{user.name}</strong> (logueado).
                </p>
            ) : (
                <p>Estás navegando como invitado.</p>
            )}
            <button
                onClick={() => {
                    logout();
                    // navigate('/login');
                }}
                style={styles.logoutButton}
            >
                Cerrar sesión
            </button>
            {/* Aquí iría el contenido real de tu “dashboard” */}
            <p>
                Esta es una página protegida que solo se ve si estás autenticado
                o como invitado.
            </p>
            <SearchBar onCityChosen={setSelectedCity} />
            {selectedCity && (
                <>
                    <WeatherCard city={selectedCity} />
                    <ForecastList city={selectedCity} />
                </>
            )}
            <FavoritesList />
            <WeatherHistory />
        </div>
    );
};

export default DashboardPage;

const styles = {
    logoutButton: {
        marginTop: '12px',
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#f44336',
        color: 'white',
        cursor: 'pointer',
    },
};
