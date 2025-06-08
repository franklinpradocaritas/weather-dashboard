// src/components/Header.jsx
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header({ onToggle }) {
    return (
        <header className='bg-light py-2 border-bottom'>
            <div className='container d-flex justify-content-between align-items-center'>
                {/* Logo + Título */}
                <div className='d-flex align-items-center'>
                    <i className='bi bi-cloud-fill text-primary fs-2 me-2'></i>
                    <h1 className='h4 mb-0'>Weather Dashboard</h1>
                </div>

                {/* Selector de unidad */}
                <div className='d-flex align-items-center'>
                    <span className='me-2'>°C</span>
                    <div className='form-check form-switch me-2'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            id='unitToggle'
                            onChange={(e) =>
                                onToggle && onToggle(e.target.checked)
                            }
                        />
                    </div>
                    <span className='me-3'>°F</span>
                    <i className='bi bi-thermometer-half text-danger fs-4'></i>
                </div>
            </div>
        </header>
    );
}
