import { createContext, useContext, useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        setIsLoggedIn(!!token);
        setUser(storedUser ? parseInt(storedUser, 10) : null);
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        setIsLoggedIn(true);
        setUser(user);
    };

    const logout = async () => {
        try {
            await fetch(`${apiUrl}/session/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



