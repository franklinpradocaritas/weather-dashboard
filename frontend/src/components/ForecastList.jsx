import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { formatShortDate } from '../utils/TimeUtils';

export default function ForecastList({ city }) {
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) return;
        api
            // .get(`${process.env.REACT_APP_API_URL}/weather/forecast/${city.id}`)
            .get(
                `${process.env.REACT_APP_API_URL}/weather/forecast/${city.name}`
            )
            .then((res) => {
                console.log('********Forecast data:', res.data);

                setForecast(res.data);
            })
            .catch((err) => setError(err.message));
    }, [city]);

    const handleShortDate = (date) => {
        console.log('01.WEATHER SHORT DATE::', date);

        const dateObj = new Date(date * 1000);
        // return formatShortDate(dateObj);
        const shortDate = formatShortDate(dateObj);
        console.log('02.WEATHER SHORT DATE::', shortDate);
        return shortDate;
    };

    if (error) return <div>Error: {error}</div>;
    if (!forecast) return <div>Loading forecast...</div>;

    // daily: array of objects [{ date, iconClass, temp, description }, …]
    return (
        <div className='card shadow-sm mb-4'>
            <div className='card-body'>
                <h5 className='card-title mb-4'>5-Day Forecast</h5>
                <div className='row gx-3'>
                    {forecast.map((day, idx) => (
                        <div className='col text-center' key={idx}>
                            <div className='card h-100'>
                                <div className='card-body p-3'>
                                    <p className='card-text mb-2 fw-semibold'>
                                        {handleShortDate(day.dt)}
                                    </p>
                                    <i
                                        className={`${day.weather_icon} mb-2`}
                                        style={{ fontSize: '2rem' }}
                                    ></i>
                                    <h6 className='mb-1'>
                                        {Math.round(day.main_temp)}°C
                                    </h6>
                                    <p className='text-muted small mb-0 text-capitalize'>
                                        {day.weather_description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    // return (
    //     <div className='card shadow-sm mb-4'>
    //         <div className='card-body'>
    //             <h5 className='card-title mb-4'>5-Day Forecast</h5>
    //             <div className='row gx-3'>
    //                 {daily.slice(0, 5).map((day, idx) => (
    //                     <div className='col text-center' key={idx}>
    //                         <div className='card h-100 border-0'>
    //                             <div className='card-body p-3'>
    //                                 <p className='card-text mb-2 fw-semibold'>
    //                                     {day.date}
    //                                 </p>
    //                                 <i
    //                                     className={`${day.iconClass} mb-2`}
    //                                     style={{ fontSize: '2rem' }}
    //                                 ></i>
    //                                 <h6 className='mb-1'>
    //                                     {Math.round(day.temp)}°C
    //                                 </h6>
    //                                 <p className='text-muted small mb-0 text-capitalize'>
    //                                     {day.description}
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // );
}

// ForecastList.propTypes = {
//   daily: PropTypes.arrayOf(
//     PropTypes.shape({
//       date:        PropTypes.string.isRequired, // e.g. "Sun, May 24"
//       iconClass:   PropTypes.string.isRequired, // e.g. "bi bi-cloud-sun"
//       temp:        PropTypes.number.isRequired,
//       description: PropTypes.string.isRequired, // e.g. "Clear Sky"
//     })
//   ).isRequired,
// };
