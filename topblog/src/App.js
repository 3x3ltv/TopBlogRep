// App.js
import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import RegistrationForm from './pages/registrationform';
import Profile from './pages/Profile';
import Header from './components/header';
import Footer from './components/footer';

const UserContext = createContext();

const App = () => {
    const [user, setUser] = useState(null);

    const setAuthenticatedUser = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        // Добавьте логику выхода, например, вызов API для выхода или очистка хранилища сессии
        setUser(null);
    };

    const contextValue = {
        user,
        setAuthenticatedUser,
        logout,
    };

    const ProtectedRoute = ({ element }) => {
        const { user } = useContext(UserContext);
        return user ? element : <Navigate to="/login" />;
    };

    return (
        <Router>
            <UserContext.Provider value={contextValue}>
                <div style={styles.container}>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route
                            path="/profile"
                            element={<ProtectedRoute element={<Profile />} />}
                        />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                    <Footer />
                </div>
            </UserContext.Provider>
        </Router>
    );
};

export default App;

const Login = () => {
    const { setAuthenticatedUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setAuthenticatedUser(userData);
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'Top',
        flexDirection: 'Row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        margin: 0, // Remove any margin
        padding: 0, // Remove any padding
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
};

export { UserContext };