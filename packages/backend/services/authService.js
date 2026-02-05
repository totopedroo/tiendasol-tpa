import jwt from "jsonwebtoken";
import { UsuarioRepository } from "../models/repositories/usuarioRepository.js";

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is required (set it in packages/backend/.env)");
}

const usuarioRepository = new UsuarioRepository();

export const authenticateUser = async (email, password) => {
  // 1. Busca el usuario en la base de datos por email
  const user = await usuarioRepository.findByEmail(email);

  // 2. Verifica que el usuario existe y la contraseña coincide
  if (!user || user.password !== password) {
    return null; // Credenciales inválidas
  }

  // 3. Prepara el payload del token (solo datos públicos)
  const payload = {
    id: user._id.toString(),
    email: user.email,
    nombre: user.nombre,
    tipo: user.tipo,
  };

  // 4. Firma el token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  // 5. Aseguramos que el token no es un objeto
  if (typeof token !== "string") {
    console.error("JWT Sign failed to return a string.");
    return null;
  }

  return token;
};
