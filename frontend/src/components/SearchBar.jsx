// import axios from 'axios';
import { useState } from 'react';
import CityAutocomplete from './CityAutocomplete';

function SearchBar({ onCityChosen }) {
    const [city, setCity] = useState('');

    // const handleSearch = async () => {
    //     if (!city.trim()) return alert('City name required');
    //     await axios.get(`/api/weather/current/${city}`);
    //     await axios.get(`/api/weather/forecast/${city}`);
    // };

    return (
        <>
            {/* <div>
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Enter city'
                />
                <button onClick={handleSearch}>Search</button>
            </div> */}
            <div style={{ marginBottom: '1rem' }}>
                <CityAutocomplete
                    onSelect={(cityObj) => {
                        // Puedes guardar en localStorage o estado global:
                        localStorage.setItem('lastCity', cityObj.name);
                        // Notificar al padre que se seleccionó una ciudad:
                        onCityChosen(cityObj);
                    }}
                />
            </div>
        </>
    );
}

export default SearchBar;
