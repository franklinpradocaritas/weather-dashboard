// frontend/src/components/CityAutocomplete.jsx
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function CityAutocomplete({ onSelect }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (query.trim().length === 0) {
            setSuggestions([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/weather/autocomplete`,
                    { params: { q: query, limit: 10 } }
                );
                setSuggestions(res.data);
                setError(null);
            } catch (err) {
                console.log('****** Error fetching suggestions:', err);

                setError('Error fetching suggestions');
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(debounceRef.current);
    }, [query]);

    const handleSelect = (item) => {
        setQuery(item.name + ', ' + item.country);
        setSuggestions([]);
        console.log('Autoocomplete selected:', { item });
        onSelect(item);
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
            <input
                type='text'
                placeholder='Type city name...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
            />
            {loading && (
                <div style={{ position: 'absolute', top: '100%', left: 0 }}>
                    Loading...
                </div>
            )}
            {error && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        color: 'red',
                    }}
                >
                    {error}
                </div>
            )}
            {suggestions.length > 0 && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #ccc',
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        maxHeight: 200,
                        overflowY: 'auto',
                        zIndex: 10,
                    }}
                >
                    {suggestions.map((item, idx) => (
                        <li
                            key={`${item.name}-${item.lat}-${item.lon}-${idx}`}
                            onClick={() => handleSelect(item)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee',
                            }}
                        >
                            {item.name}, {item.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
