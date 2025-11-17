import { Router } from "express";
import jwt from "jsonwebtoken";

export class AuthController {
  constructor(authService) {
    // En este caso, solo necesitas el servicio de autenticación
    this.authService = authService;
  }

  loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan credenciales." });
    }
    // Llamada al servicio para obtener el token
    const token = await this.authService.authenticateUser(email, password);

    if (token) {
      // Éxito: Enviar el token al cliente
      return res.status(201).json({
        message: "Login exitoso",
        token: token,
      });
    } else {
      // Falla
      return res.status(401).json({ message: "No existe este usuario." });
    }
  };
}
