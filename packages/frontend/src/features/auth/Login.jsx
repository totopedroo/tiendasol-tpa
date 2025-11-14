import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Popup from "../../components/popups/PopUp.jsx";
import { useAuth } from "../../context/AuthContexto.jsx";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Estado para el popup
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga del botón

  const handleClosePopup = () => {
    setMostrarPopup(false);
    if (titulo === "Inicio de sesión exitoso") {
      navigate("/");
    }
  };

   const [form, setForm] = useState({
    email: "", 
    password: "", 
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    console.log("Enviando formulario de login:", form);
    const user = await login(form.email, form.password);

    setTitulo("Inicio de sesión exitoso");
    setMensaje('Bienvenido de nuevo,' + user.nombre +' ✅');
    setMostrarPopup(true);

    console.log("Login exitoso desde el Login.jsx", user);

    } catch (error) {
      setTitulo("Error de Credenciales");
      setMensaje(error.message || "Ocurrió un error inesperado al iniciar sesión.");
      setMostrarPopup(true);
    } finally {
      setLoading(false);
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
            disabled={loading}
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
            disabled={loading}
          />

          <Link to="/reset-password" className="reset-link">
            ¿Olvidaste tu contraseña?
          </Link>

          <button type="submit" className="btn-login"disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
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
