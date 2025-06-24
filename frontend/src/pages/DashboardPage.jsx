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

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Header />
            <SearchBar onCityChosen={setSelectedCity} />
            {selectedCity && (
                <>
                    <WeatherCard city={selectedCity} />
                    <ForecastList city={selectedCity} />
                </>
            )}
            <div className='row'>
                <div className='col-6'>
                    <FavoritesList />
                </div>
                <div className='col-6'>
                    <WeatherHistory />
                </div>
            </div>
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
