// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// // import ProtectedRoute from '@/components/ProtectedRoute';
// // import { AuthProvider } from '@/context/AuthContext';
// import ProtectedRoute from 'components/ProtectedRoute';
// import { AuthProvider } from 'context/AuthContext';

// import DashboardPage from './pages/DashboardPage';
// import LoginPage from './pages/LoginPage';

// function App() {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/login" element={<LoginPage />} />

//                     <Route
//                         path="/"
//                         element={
//                             <ProtectedRoute>
//                                 <DashboardPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// }

// export default App;


// ======================================================================

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// import ProtectedRoute from '@/components/ProtectedRoute';
// import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
}

export default App;


// ======================================================================

// import FavoritesList from './components/FavoritesList';
// import ForecastList from './components/ForecastList';
// import SearchBar from './components/SearchBar';
// import WeatherCard from './components/WeatherCard';
// import WeatherHistory from './components/WeatherHistory';
// import LoginPage from './pages/LoginPage';

// function App() {
//     return (
//         <div className="container">
//             <h1>Weather Dashboard</h1>
//             <LoginPage />

//             <SearchBar />
//             <WeatherCard />
//             <ForecastList />
//             <FavoritesList />
//             <WeatherHistory />
//         </div>
//     );
// }

// export default App;


