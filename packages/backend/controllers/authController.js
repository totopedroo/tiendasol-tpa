
/**
 * Clase controladora para manejar la autenticación.
 * Sigue el patrón de tu proyecto, aunque solo necesite el servicio de autenticación.
 */
export class AuthController {
    constructor(authService) {
        // En este caso, solo necesitas el servicio de autenticación
        this.authService = authService; 
    }

    loginUser = (req, res) => {
        const { email, password } = req.body; 

        if (!email || !password) {
            return res.status(400).json({ message: "Faltan credenciales." });
        }
        // Llamada al servicio para obtener el token
        const token = this.authService.authenticateUser(email, password);

        if (token) {
            // Éxito: Enviar el token al cliente
            return res.json({ 
                message: "Login exitoso", 
                token: token,
            }); 
        } else {
            // Falla
            return res.status(401).json({ message: "Credenciales inválidas." });
        }
    };
}