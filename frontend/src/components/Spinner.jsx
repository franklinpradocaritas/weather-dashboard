import 'bootstrap/dist/css/bootstrap.min.css';
export default function Spinner({ variant = 'primary', size, className = '' }) {
    // Bootstrap supports a small spinner with 'spinner-border-sm'
    const sizeClass = size === 'sm' ? 'spinner-border-sm' : '';

    return (
        <div
            className={`spinner-border ${sizeClass} text-${variant} ${className}`}
            role='status'
        >
            <span className='visually-hidden'>Loading...</span>
        </div>
    );
}
