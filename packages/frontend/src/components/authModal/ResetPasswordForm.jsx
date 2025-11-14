/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./AuthForms.css";
import { Button } from "../button/Button.jsx";

export const ResetPasswordForm = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulación de envío de email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-card card flex flex-col items-center text-center gap-4">
        <div className="auth-logo-wrapper flex items-center justify-center gap-2">
          <img src="/images/logo.png" alt="TiendaSol" className="auth-logo" />
          <span className="auth-logo-text">TiendaSol</span>
        </div>

        <h2 className="auth-title">¡Correo enviado!</h2>
        <p className="auth-text">
          Se ha enviado un link de restablecimiento a <strong>{email}</strong>.
          Por favor, revisa tu bandeja de entrada.
        </p>

        <Button
          variant="primary"
          size="medium"
          fullWidth={true}
          onClick={onSwitchToLogin}
        >
          Volver al inicio de sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="auth-card card flex flex-col items-center text-center gap-4">
      {/* Logo + texto TiendaSol */}
      <div className="auth-logo-wrapper flex items-center justify-center gap-2">
        <img src="/images/logo.png" alt="TiendaSol" className="auth-logo" />
        <span className="auth-logo-text">TiendaSol</span>
      </div>

      {/* Título y descripción */}
      <h2 className="auth-title">Restablecer Contraseña</h2>
      <p className="auth-text">
        Ingrese su correo electrónico asociado a su cuenta de TiendaSol y le
        enviaremos un link para restablecer su contraseña.
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
          type="email"
          className="input"
          placeholder="ejemplo@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </form>

      {/* Volver */}
      <button className="auth-back-link" onClick={onSwitchToLogin}>
        Volver al inicio de sesión
      </button>
    </div>
  );
};
