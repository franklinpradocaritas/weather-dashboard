import styles from './RateLimitOverlay.module.scss';

export default function RateLimitOverlay({ onReset }) {
    return (
        <div className={styles.rateLimitOverlay}>
            <div className={styles.rateLimitBox}>
                <h2>Too many request</h2>
                <p>Please try again later.</p>
                <button className='btn btn-light' onClick={onReset}>
                    Close
                </button>
            </div>
        </div>
    );
}
