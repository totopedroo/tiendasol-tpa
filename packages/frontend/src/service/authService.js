import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password,
        });
        const token = response.data.token;

        if (typeof token !== 'string' || token.length === 0) {
             console.error("El backend no devolvió el token esperado en response.data.token.", response.data);
                          throw new Error("Respuesta de autenticación incompleta: falta el token.");
        }

        console.log("Token recibido:", token);
        if (!token) {
            throw new Error("Respuesta de login incompleta: falta el token.");
        }
        return token;
    } catch (error) {
         let errorMessage;

        if (error.response) {
            // Error del servidor (ej. 401, 400, 500)
            const status = error.response.status;
            const message = error.response.data?.message;

            if (status === 401) {
                errorMessage = message || "Credenciales inválidas. Verifique su email y contraseña.";
            } else if (status === 400) {
                errorMessage = message || "Solicitud incompleta. Faltan datos en el formulario.";
            } else {
                errorMessage = message || `Error del servidor (${status}).`;
            }

        } else if (error.message && error.message.includes("falta el token")) {
            // Capturamos el error que lanzamos en la validación (punto 2)
            errorMessage = error.message;
        } else {
             // Error de red (el servidor no respondió)
             errorMessage = "Error de conexión. No se pudo contactar con el servidor.";
        }

        console.error("Error en login (AuthService):", errorMessage);
        // Propagamos un error limpio para que Login.jsx lo capture en el try/catch
        throw new Error(errorMessage);
    }
};
