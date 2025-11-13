import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Popup from "../../components/popups/PopUp.jsx";

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  // Estado para el popup
  const [mostrarPopup, setMostrarPopup] = useState(false);  
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  
  const handleClosePopup = () => {
      setMostrarPopup(false);
      if (titulo === "Éxito") { // si el login fue exitoso, que te mande a la pagina principal
        navigate("/login"); // si podemos hacer que despues de registrarse quede iniciado sesión
      }
    }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmarPassword) {
      alert("⚠️ Las contraseñas no coinciden.");
      return;
    }

    // Agregar mas verificaciones => Si el correo ya esta registrado, etc. TODO
    setTitulo("Éxito");
    setMensaje("Cuenta creada con éxito ✅");
    setMostrarPopup(true);
  };

  return (
    <div className="register-container flex justify-center items-center">
      <div className="register-card card flex flex-col items-center text-center gap-4">
        {/* Logo + TiendaSol */}
        <div className="logo-wrapper flex items-center justify-center gap-2">
          <img src="/images/logo.png" alt="TiendaSol" className="register-logo" />
          <span className="logo-text-strong">TiendaSol</span>
        </div>

        <h2 className="register-title">Crea tu cuenta</h2>

        <form className="register-form flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="label">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className="input"
            placeholder="Texto"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="apellido" className="label">Apellido</label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            className="input"
            placeholder="Texto"
            value={form.apellido}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="label">Correo electrónico</label>
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

          <label htmlFor="password" className="label">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            className="input"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmarPassword" className="label">Repetir contraseña</label>
          <input
            id="confirmarPassword"
            name="confirmarPassword"
            type="password"
            className="input"
            placeholder="********"
            value={form.confirmarPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-register">Crear cuenta</button>
        </form>

        <div className="register-bottom-text">
          ¿Ya tenés una cuenta?{" "}
          <Link to="/login" className="login-link">
            Iniciar sesión
          </Link>

          <Popup
            title={titulo}
            isOpen={mostrarPopup}
            onClose={handleClosePopup}
            mensaje={mensaje}
            >
            </Popup>
        </div>
      </div>
    </div>
  );
};
