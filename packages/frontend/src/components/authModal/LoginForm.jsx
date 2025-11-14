/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./AuthForms.css";
import Popup from "../popups/PopUp.jsx";
import { useAuth } from "../../context/AuthContexto.jsx";
import { Button } from "../button/Button.jsx";

export const LoginForm = ({ onClose, onSwitchToRegister, onSwitchToReset }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClosePopup = () => {
    setMostrarPopup(false);
    if (titulo === "Inicio de sesión exitoso") {
      onClose();

      // Obtener el parámetro returnTo de la URL
      const returnTo = searchParams.get("returnTo");

      // Redirigir a returnTo si existe, sino al home
      navigate(returnTo || "/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Enviando formulario de login:", form);
      const user = await login(form.email, form.password);

      setTitulo("Inicio de sesión exitoso");
      setMensaje("Bienvenido de nuevo, " + user.nombre + " ✅");
      setMostrarPopup(true);

      console.log("Login exitoso desde el LoginForm.jsx", user);
    } catch (error) {
      setTitulo("Error de Credenciales");
      setMensaje(
        error.message || "Ocurrió un error inesperado al iniciar sesión."
      );
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

      {/* Título */}
      <h2 className="auth-title">Iniciar sesión</h2>
      <p className="auth-text">
        Ingrese su correo electrónico y contraseña para acceder a su cuenta.
      </p>

      {/* Formulario */}
      <form
        className="auth-form flex flex-col gap-3 w-full"
        onSubmit={handleSubmit}
      >
        <label className="auth-label" htmlFor="email">
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

        <label className="auth-label" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
          placeholder="Tu contraseña"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <button
          type="button"
          className="auth-reset-link"
          onClick={onSwitchToReset}
        >
          ¿Olvidaste tu contraseña?
        </button>

        <Button
          type="submit"
          variant="primary"
          size="medium"
          fullWidth={true}
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="auth-bottom-text">
        ¿Primera vez en <span className="bold">TiendaSol</span>?{" "}
        <button className="auth-switch-link" onClick={onSwitchToRegister}>
          Crear una cuenta
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
