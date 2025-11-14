import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const SECRET_KEY = 'your_secret_key';

const mockUsuarios = [
    { email: "admin@tiendasol.com", password: "password123", id: "user_admin", nombre: "Admin", apellido: "TiendaSol" },
    { email: "santinorondini@gmail.com", password: "123", id: "user_001", nombre: "Santino", apellido: "Rondini" }, 
    { email: "user@tiendasol.com", password: "password123", id: "user_002", nombre: "Cliente Frecuente", apellido: "Gonzalez" }
];

export const authenticateUser = (email, password) => {
    // 1. Busca el usuario de forma síncrona
    const user = mockUsuarios.find(
        (usuario) => usuario.email === email && usuario.password === password
    );

    if (!user) {
        return null; // Credenciales inválidas
    }

    // 2. Prepara el payload del token (solo datos públicos)
    const payload = {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido
    };

    // 3. Firma el token
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // 4. Aseguramos que el token no es un objeto
    if (typeof token !== 'string') {
        console.error("JWT Sign failed to return a string.");
        return null;
    }

    return token;
}