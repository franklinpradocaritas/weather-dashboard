import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, isAnonymous } = useAuth();
    console.log('ProtectedRoute:', { user, isAnonymous });

    if (!user && !isAnonymous) {
        return <Navigate to='/login' replace />;
    }
    return children;
};

export default ProtectedRoute;
