// src/components/Header.jsx
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleTemperatureUnit from './atoms/ToggleTemperatureUnit';

export default function Header() {
    return (
        <header className='bg-light py-2 border-bottom'>
            <div className='container d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                    <i className='bi bi-cloud-fill text-primary fs-2 me-2'></i>
                    <h1 className='h4 mb-0'>Weather Dashboard</h1>
                </div>
                <div className='d-flex align-items-center'>
                    <ToggleTemperatureUnit />
                </div>
            </div>
        </header>
    );
}
