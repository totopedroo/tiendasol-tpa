import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContexto.jsx';

const FiltroDeSesion = () => {
    const { isAuthenticated } = useAuth(); 

    if (!isAuthenticated) { // no esta registrado
        return <Navigate to="/login" replace />; // te llevo a login
    }

    // Si esta registado, va a la ruta hija que es Vender 
    return <Outlet />; 
}

export default FiltroDeSesion;


