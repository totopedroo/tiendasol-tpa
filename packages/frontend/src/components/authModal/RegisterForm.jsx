/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForms.css";
import Popup from "../popups/PopUp.jsx";
import { Button } from "../button/Button.jsx";

export const RegisterForm = ({ onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmarPassword: "",
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
    if (titulo === "Éxito") {
      onSwitchToLogin();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (form.password !== form.confirmarPassword) {
        setTitulo("Error");
        setMensaje("⚠️ Las contraseñas no coinciden.");
        setMostrarPopup(true);
        return;
      }

      // Agregar más verificaciones => Si el correo ya está registrado, etc. TODO
      setTitulo("Éxito");
      setMensaje("Cuenta creada con éxito ✅");
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
          placeholder="Texto"
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
          placeholder="Texto"
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
          placeholder="Texto"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="password" className="auth-label">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
          placeholder="********"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="confirmarPassword" className="auth-label">
          Repetir contraseña
        </label>
        <input
          id="confirmarPassword"
          name="confirmarPassword"
          type="password"
          className="input"
          placeholder="********"
          value={form.confirmarPassword}
          onChange={handleChange}
          required
          disabled={loading}
        />

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
