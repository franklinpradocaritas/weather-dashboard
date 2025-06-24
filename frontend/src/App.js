import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ErrorProvider } from './context/ErrorContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { HistoryProvider } from './context/HistoryContext';
import { TemperatureUnitProvider } from './context/TemperatureUnitContext';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <ErrorProvider>
            <AuthProvider>
                <TemperatureUnitProvider>
                    <FavoritesProvider>
                        <HistoryProvider>
                            <Router>
                                <Routes>
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route
                                        path="/"
                                        element={
                                            <ProtectedRoute>
                                                <DashboardPage />
                                            </ProtectedRoute>
                                        }
                                    />
                                </Routes>
                            </Router>
                        </HistoryProvider>
                    </FavoritesProvider>
                </TemperatureUnitProvider>
            </AuthProvider>
        </ErrorProvider>
    );
}

export default App;