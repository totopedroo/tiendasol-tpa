import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Popup from "../../components/popups/PopUp.jsx";

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Estado para el popup
  const [mostrarPopup, setMostrarPopup] = useState(false);  
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");

  const handleClosePopup = () => {
    setMostrarPopup(false);
    if (titulo === "Éxito") { // si el login fue exitoso, que te mande a la pagina principal
      navigate("/");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simula login exitoso
    if (form.email && form.password) {
      setTitulo("Éxito");
      setMensaje("Bienvenido nuevamente a TiendaSol! ✅");
      setMostrarPopup(true);
    }
    else { 
    // Por ahora manejo el error asi. TODO
      setTitulo("Error de Credenciales");
      setMensaje("Por favor, ingrese un correo electrónico y contraseña válidos.");
      setMostrarPopup(true);
    }
  };

  return (
    <div className="login-container flex justify-center items-center">
      <div className="login-card card flex flex-col items-center text-center gap-4">
        {/* Logo + TiendaSol */}
        <div className="logo-wrapper flex items-center justify-center gap-2">
          <img src="/images/logo.png" alt="TiendaSol" className="login-logo" />
          <span className="logo-text-strong">TiendaSol</span>
        </div>

        {/* Título */}
        <h2 className="login-title">Iniciar sesión</h2>
        <p className="login-text">
          Ingrese su correo electrónico y contraseña para acceder a su cuenta.
        </p>

        {/* Formulario */}
        <form className="login-form flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <label className="label" htmlFor="email">
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
          />

          <label className="label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input"
            placeholder="Texto"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Link to="/reset-password" className="reset-link">
            ¿Olvidaste tu contraseña?
          </Link>

          <button type="submit" className="btn-login">
            Iniciar sesión
          </button>
        </form>

        <div className="login-bottom-text">
          ¿Primera vez en <span className="bold">TiendaSol</span>?{" "}
          <Link to="/register" className="register-link">
            Crear una cuenta
          </Link>
        </div>

        <Popup
          title={titulo}
          isOpen={mostrarPopup}
          onClose={handleClosePopup}
          mensaje={mensaje}
          >
          </Popup>
      </div>
    </div>
  );
};
