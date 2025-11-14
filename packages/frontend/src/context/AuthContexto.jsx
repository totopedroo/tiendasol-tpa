import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as apiLogin } from "../service/authService.js";
import { jwtDecode } from 'jwt-decode';

const AuthContexto = createContext();

export const useAuth = () => useContext(AuthContexto);

const checkTokenExpiration = (token) => {
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            return null;
        }
        return decoded;
    } catch (error) {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const initialToken = localStorage.getItem('token');
    const [user, setUser] = useState(checkTokenExpiration(initialToken));
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);
    const [loading, setLoading] = useState(true);

    if (isAuthenticated){
        console.log("Usuario autenticado en AuthProvider:", user);
    }
    useEffect(() => {
        if (!user && initialToken) {
            localStorage.removeItem('token');
        }
        setLoading(false);
    }, [initialToken, user]);

    const login = useCallback(async (email, password) => {
        try {

            console.log("Intentando login con:", email, password);
            const token = await apiLogin(email, password);
            
            console.log("Token recibido en AuthContexto:", token);
            localStorage.setItem("token", token);

            console.log("Decodificando token...");
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
            setIsAuthenticated(true);
            console.log("Usuario autenticado:", decodedUser);   
            return decodedUser;

        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
    };

    return (
        <AuthContexto.Provider value={value}>
            {children}
        </AuthContexto.Provider>
    );
};
