// src/components/CityAutocomplete.jsx
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function CityAutocomplete({
    onSelect,
    placeholder = 'Search city...',
}) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [show, setShow] = useState(false);
    const containerRef = useRef(null);
    const debounceRef = useRef(null);
    const justSelectedRef = useRef(false);

    // Petición con debounce
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            if (justSelectedRef.current) return;
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/weather/autocomplete`,
                    { params: { q: query, limit: 5 } }
                );
                setSuggestions(res.data);
                setShow(true);
            } catch {
                setSuggestions([]);
            }
        }, 400);
        return () => clearTimeout(debounceRef.current);
    }, [query]);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                setShow(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        justSelectedRef.current = true;
        onSelect(item);
        setQuery(`${item.name}, ${item.country}`);
        setShow(false);
        setSuggestions([]);
    };

    const handleChange = (e) => {
        justSelectedRef.current = false;
        setQuery(e.target.value);
    };

    return (
        <div ref={containerRef} className='position-relative'>
            <input
                type='text'
                className='form-control'
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
                onFocus={() => suggestions.length && setShow(true)}
            />

            {show && suggestions.length > 0 && (
                <ul className='dropdown-menu show w-100 mt-0'>
                    {suggestions.map((item, idx) => (
                        <li key={`${item.name}-${idx}`}>
                            <button
                                type='button'
                                className='dropdown-item'
                                onClick={() => handleSelect(item)}
                            >
                                {item.name}, {item.country}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
