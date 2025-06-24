import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const { login, loginAsGuest } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log('01.Submitting', { username });

        e.preventDefault();
        console.log('02.Submitting');

        if (username.trim().length === 0) {
            console.log('03.Submitting');
            return;
        }
        console.log('04.Submitting');
        await login({ username: username.trim() });
        console.log('05.Submitting');
        console.log('Navigating to home with username:', username);

        navigate('/');
        console.log('After navigating to home');
    };

    const handleGuest = () => {
        loginAsGuest();
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label htmlFor='username'>Nombre de usuario:</label>
                <input
                    type='text'
                    id='username'
                    placeholder='Escribe tu nombre'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <button type='submit' style={styles.button}>
                    Ingresar
                </button>
            </form>

            <p>— o —</p>

            <button onClick={handleGuest} style={styles.buttonPrimary}>
                Continuar como invitado
            </button>
        </div>
    );
};

export default LoginPage;

const styles = {
    container: {
        maxWidth: '400px',
        margin: '80px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #aaa',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        cursor: 'pointer',
    },
    buttonPrimary: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#2196F3',
        color: 'white',
        cursor: 'pointer',
    },
};
