import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from '../context/HistoryContext';
import CityAutocomplete from './CityAutocomplete';

export default function SearchBar({ onCityChosen }) {
    const [selectedCity, setSelectedCity] = useState(null);
    const { logout } = useAuth();
    const { refreshHistory } = useHistory();

    const handleSelect = (cityObj) => {
        refreshHistory();
        setSelectedCity(cityObj);
        onCityChosen(cityObj);
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light mb-3'>
            <div className='container d-flex flex-wrap justify-content-center'>
                <form
                    className='col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto'
                    role='search'
                >
                    <CityAutocomplete
                        onSelect={handleSelect}
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
