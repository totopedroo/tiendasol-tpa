import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

const mockUsuarios = [
    { email: "santinorondini@gmail.com", password: "password123", id: "user_001", nombre: "Santino", apellido: "Rondini" },
    { email: "user@tiendasol.com", password: "password123", id: "user_002", nombre: "Cliente Frecuente", apellido: "Gonzalez" }

];

export const authenticateUser = (email, password) => {
    const user = mockUsuarios.find(
        (usuario) => usuario.email === email && usuario.password === password
    );

    if (!user) {
        return null;
    }

    const payload = {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    return token;
}

