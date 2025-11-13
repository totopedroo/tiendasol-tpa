import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContexto = createContext(); // creamos el contexto

export const useAuth = () => useContext(AuthContexto); // creamos este hook personalizado para que cualquier componente pueda acceder al contexto

export const AuthProvider = ({ children }) => {
    // Verificación de si hay token 
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('jwt_token') // ocurre apenas se carga la página
    );

    // funcion para loguearse
    const login = (token) => {
        localStorage.setItem("jwt_token", token);
        setIsAuthenticated(true);
    } 

    // función para desloguearse
    const logout = () => {
        localStorage.removeItem("jwt_token");
        setIsAuthenticated(false);
    }

    return(
        <AuthContexto.Provider value ={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContexto.Provider>
    )
};