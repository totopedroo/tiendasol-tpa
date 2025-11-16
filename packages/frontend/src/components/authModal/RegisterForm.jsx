/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForms.css";
import Popup from "../popups/PopUp.jsx";
import { Button } from "../button/Button.jsx";
import { createUsuario } from "../../service/usuariosService.js";
import { useAuth } from "../../context/AuthContexto.jsx";
import { Eye } from "../icons/Eye.jsx";
import { EyeOff } from "../icons/EyeOff.jsx";

export const RegisterForm = ({ onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmarPassword: "",
  });

  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] =
    useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClosePopup = () => {
    setMostrarPopup(false);
    if (titulo === "Éxito") {
      onClose(); // Cerrar el modal directamente ya que el usuario estará autenticado
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar que las contraseñas coincidan
      if (form.password !== form.confirmarPassword) {
        setTitulo("Error");
        setMensaje("⚠️ Las contraseñas no coinciden.");
        setMostrarPopup(true);
        setLoading(false);
        return;
      }

      // Validar longitud mínima del teléfono
      if (form.telefono.length < 11) {
        setTitulo("Error");
        setMensaje("⚠️ El teléfono debe tener al menos 11 caracteres.");
        setMostrarPopup(true);
        setLoading(false);
        return;
      }

      // Crear el usuario en el backend
      const nuevoUsuario = {
        nombre: `${form.nombre} ${form.apellido}`,
        email: form.email,
        telefono: form.telefono,
        password: form.password,
        tipo: "COMPRADOR", // Por defecto los registros son compradores
        fechaAlta: new Date(),
      };

      await createUsuario(nuevoUsuario);

      // Hacer login automático con las credenciales
      await login(form.email, form.password);

      setTitulo("Éxito");
      setMensaje("✅ Cuenta creada e inicio de sesión exitoso!");
      setMostrarPopup(true);
    } catch (error) {
      console.error("Error en registro:", error);
      setTitulo("Error");
      if (error.response?.data?.message) {
        setMensaje(`⚠️ ${error.response.data.message}`);
      } else if (error.response?.status === 400) {
        setMensaje(
          "⚠️ Por favor verifica que todos los campos sean correctos."
        );
      } else if (error.message) {
        setMensaje(`⚠️ ${error.message}`);
      } else {
        setMensaje(
          "⚠️ Ocurrió un error al crear la cuenta. Por favor intenta nuevamente."
        );
      }
      setMostrarPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card card flex flex-col items-center text-center gap-4">
      {/* Logo + TiendaSol */}
      <div className="auth-logo-wrapper flex items-center justify-center gap-2">
        <img src="/images/logo.png" alt="TiendaSol" className="auth-logo" />
        <span className="auth-logo-text">TiendaSol</span>
      </div>

      <h2 className="auth-title">Crea tu cuenta</h2>

      <form
        className="auth-form flex flex-col gap-3 w-full"
        onSubmit={handleSubmit}
      >
        <label htmlFor="nombre" className="auth-label">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className="input"
          placeholder="Ingrese su nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="apellido" className="auth-label">
          Apellido
        </label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          className="input"
          placeholder="Ingrese su apellido"
          value={form.apellido}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="email" className="auth-label">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          placeholder="ejemplo@mail.com"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="telefono" className="auth-label">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className="input"
          placeholder="Ej: 11234567890"
          value={form.telefono}
          onChange={handleChange}
          required
          disabled={loading}
          minLength={11}
        />

        <label htmlFor="password" className="auth-label">
          Contraseña
        </label>
        <div className="password-input-wrapper w-full">
          <input
            id="password"
            name="password"
            type={mostrarPassword ? "text" : "password"}
            className="input"
            placeholder="Mínimo 8 caracteres"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
            disabled={loading}
          />
          <button
            type="button"
            className="password-toggle-btn flex items-center justify-center cursor-pointer"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            aria-label={
              mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {mostrarPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <label htmlFor="confirmarPassword" className="auth-label">
          Repetir contraseña
        </label>
        <div className="password-input-wrapper w-full">
          <input
            id="confirmarPassword"
            name="confirmarPassword"
            type={mostrarConfirmarPassword ? "text" : "password"}
            className="input"
            placeholder="Mínimo 8 caracteres"
            value={form.confirmarPassword}
            onChange={handleChange}
            required
            minLength={8}
            disabled={loading}
          />
          <button
            type="button"
            className="password-toggle-btn flex items-center justify-center cursor-pointer"
            onClick={() =>
              setMostrarConfirmarPassword(!mostrarConfirmarPassword)
            }
            aria-label={
              mostrarConfirmarPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
          >
            {mostrarConfirmarPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="medium"
          fullWidth={true}
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      <div className="auth-bottom-text">
        ¿Ya tenés una cuenta?{" "}
        <button className="auth-switch-link" onClick={onSwitchToLogin}>
          Iniciar sesión
        </button>
      </div>

      <Popup
        title={titulo}
        isOpen={mostrarPopup}
        onClose={handleClosePopup}
        mensaje={mensaje}
      />
    </div>
  );
};
