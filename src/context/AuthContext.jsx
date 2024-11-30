import { createContext, useContext, useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(!!token);
    setUser(storedUser ? JSON.parse(storedUser) : null);
}, []);


    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        setUser(user);
    };
    

    const logout = async () => {
        try {
            console.log(API_URL)
            console.log("Starting logout...");
            await fetch(`${API_URL}/session/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            console.log("Logged out from server.");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            setUser(null);
            console.log("Client-side logout successful.");
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



