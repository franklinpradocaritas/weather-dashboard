import { useEffect, useState } from 'react';
import FavoritesList from '../components/FavoritesList';
import ForecastList from '../components/ForecastList';
import Header from '../components/Header';
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

    const handleUnitToggle = (isFahrenheit) => {
        console.log(isFahrenheit ? 'Ahora °F' : 'Ahora °C');
        // aquí puedes actualizar tu estado global / Context
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* <h1>Dashboard</h1>
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
                }}
                style={styles.logoutButton}
            >
                Cerrar sesión
            </button>
            <p>
                Esta es una página protegida que solo se ve si estás autenticado
                o como invitado.
            </p> */}
            <Header onToggle={handleUnitToggle} />
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
