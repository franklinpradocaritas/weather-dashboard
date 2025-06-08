import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import CityAutocomplete from './CityAutocomplete';

export default function SearchBar({ onCityChosen }) {
    const [selectedCity, setSelectedCity] = useState(null);
    const { logout } = useAuth();

    const handleSelect = (cityObj) => {
        setSelectedCity(cityObj);
        onCityChosen(cityObj);
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light mb-3'>
            {/* <div className='container-fluid'>
                <a className='navbar-brand' href='/'>
                    WeatherApp
                </a>

                <form
                    className='d-flex ms-auto'
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (selectedCity) onCityChosen(selectedCity);
                    }}
                >
                    <div className='input-group'>
                        <CityAutocomplete
                            onSelect={handleSelect}
                            inputClass='form-control'
                            dropdownClass='dropdown-menu'
                        />
                        <button
                            className='btn btn-primary'
                            type='submit'
                            disabled={!selectedCity}
                        >
                            Buscar
                        </button>
                    </div>
                </form>
            </div> */}
            <div className='container d-flex flex-wrap justify-content-center'>
                <form
                    className='col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto'
                    role='search'
                >
                    <CityAutocomplete
                        onSelect={handleSelect}
                        // Pasa clases Bootstrap a sus props de input y dropdown
                        inputClass='form-control'
                        dropdownClass='dropdown-menu'
                    />
                </form>
                <div className='text-end'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                    {/* <button type='button' class='btn btn-primary'>
                        Sign-up
                    </button> */}
                </div>
            </div>
        </nav>
    );
}
