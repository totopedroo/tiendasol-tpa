import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ResetPassword.css";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Se envió un link de restablecimiento a: ${email}`);
  };

  return (
    <div className="reset-container flex justify-center items-center">
      <div className="reset-card card flex flex-col items-center text-center gap-4">
        {/* Logo + texto TiendaSol */}
        <div className="logo-wrapper flex items-center justify-center gap-2">
          <img src="/images/logo.png" alt="TiendaSol" className="reset-logo" />
          <span className="logo-text-strong">TiendaSol</span>
        </div>

        {/* Título y descripción */}
        <h2 className="reset-title">Restablecer Contraseña</h2>
        <p className="reset-text">
          Ingrese su correo electrónico asociado a su cuenta de TiendaSol y le
          enviaremos un link para restablecer su contraseña.
        </p>

        {/* Formulario */}
        <form className="reset-form flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <label className="label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="Texto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="btn-reset">
            Enviar
          </button>
        </form>

        {/* Volver */}
        <Link to="/login" className="reset-back">
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
};
