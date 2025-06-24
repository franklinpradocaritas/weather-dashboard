import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { HistoryContext } from '../context/HistoryContext';
import api from '../services/api';

export default function WeatherHistory() {
    const { history, clearHistory } = useContext(HistoryContext);
    const [saving, setSaving] = useState(false);

    const handleClear = async () => {
        setSaving(true);
        try {
            await api.delete(
                `${process.env.REACT_APP_API_URL}/weather/history`
            );
            clearHistory();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='card shadow-sm mb-4 h-100'>
            {/* Cuerpo */}
            <div className='card-body'>
                <div className='d-flex align-items-center mb-4'>
                    <i className='bi bi-clock-history me-2'></i>
                    <h5 className='mb-0'>Search History</h5>
                </div>
                {history.length === 0 ? (
                    <p className='text-muted mb-0'>No search history yet.</p>
                ) : (
                    <>
                        <div className='mb-3'>
                            {history.map(({ id, city_name, country_code }) => (
                                <span
                                    key={id}
                                    className='badge text-bg-secondary p-2 me-2 mb-2 fs-6'
                                >
                                    {city_name} ({country_code})
                                </span>
                            ))}
                        </div>
                        <button
                            className='btn btn-link text-danger p-0 d-flex align-items-center'
                            onClick={handleClear}
                            disabled={history.length === 0 || saving}
                        >
                            <i className='bi bi-trash-fill me-1'></i>
                            Clear History
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
