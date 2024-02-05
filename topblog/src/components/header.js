// Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Header = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Перенаправляем пользователя на страницу входа после выхода
    };

    return (

        <div style={styles.header}>
            <div style={styles.navContainer}>
                <button>
                    <Link to="/">Home</Link>
                </button>
                <button>
                    <Link to="/blog">Blog</Link>
                </button>
                <button>
                    <Link to="/about">About</Link>
                </button>
                <button>
                    <Link to="/contact">Contact</Link>
                </button>
                {user ? (
                    <>
                        <button>
                            <Link to="/profile">Profile</Link>
                        </button>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <button>
                            <Link to="/login">Login</Link>
                        </button>
                        <button>
                            <Link to="/register">Register</Link>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        background: '#5eaaa8', // Background color for the header
        color: '#fff', // Text color for the header
        width: '100%', // Specify the width of the header
        height: '80px', // Specify the height of the header
    },
    logoContainer: {
        flex: 1,
    },
    logo: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center', // Align logo vertically in the container
    },
    logoImage: {
        width: '40px', // Set the width of the logo image
        height: '40px', // Set the height of the logo image
        marginRight: '10px', // Add margin for spacing
    },
    nav: {
        display: 'flex',
        gap: '20px',
        flex: 1, // Take up all available space
        justifyContent: 'flex-end', // Align buttons to the right
    },
    navItem: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
    },
};

export default Header;
