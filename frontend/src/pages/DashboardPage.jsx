import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ErrorBanner from '../components/atoms/ErrorBanner';
import RateLimitOverlay from '../components/atoms/RateLimitOverlay';
import FavoritesList from '../components/FavoritesList';
import ForecastList from '../components/ForecastList';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import WeatherHistory from '../components/WeatherHistory';
import { useAuth } from '../context/AuthContext';
import { RATE_LIMIT_EVENT } from '../services/api';

const DashboardPage = () => {
    const { user, isAnonymous, logout } = useAuth();
    const [selectedCity, setSelectedCity] = useState(null);
    const [isRateLimited, setIsRateLimited] = useState(false);

    useEffect(() => {
        const last = localStorage.getItem('lastCity');
        if (last) setSelectedCity({ name: last });

        const handler = () => setIsRateLimited(true);
        window.addEventListener(RATE_LIMIT_EVENT, handler);
        return () => window.removeEventListener(RATE_LIMIT_EVENT, handler);
    }, []);

    const handleReset = () => setIsRateLimited(false);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <ErrorBanner />
            <Header />
            <SearchBar onCityChosen={setSelectedCity} />
            {selectedCity && (
                <>
                    <WeatherCard city={selectedCity} />
                    <ForecastList city={selectedCity} />
                </>
            )}
            {!isAnonymous && (
                <div className='row'>
                    <div className='col-6'>
                        <FavoritesList />
                    </div>
                    <div className='col-6'>
                        <WeatherHistory />
                    </div>
                </div>
            )}
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
            />
            {isRateLimited && <RateLimitOverlay onReset={handleReset} />}
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
