import React, { useState } from "react";
import "./Contacto.css";
import Popup from "../../components/popups/PopUp.jsx";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContexto.jsx";
export const Contacto = () => {
  // 🔹 Más adelante, este nombre puede venir de contexto o backend
  const nombreCliente = useAuth().user?.nombre || "Cliente";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    motivo: "",
    descripcion: "",
  });

  // Estado para el popup
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");

  const handleClosePopup = () => {
    setMostrarPopup(false);
    if (titulo === "Éxito") {
      // si el login fue exitoso, que te mande a la pagina principal
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitulo("Éxito");
    setMensaje("Consulta enviada con éxito ✅");
    setMostrarPopup(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="contacto-container flex flex-col gap-4">
      <h2 className="contacto-title">
        Hola, <span className="cliente">{nombreCliente}</span>! Envíanos tu
        consulta
      </h2>

      <form
        className="contacto-form flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="contacto-field flex flex-col gap-2 flex-1">
          <label>Nombre *</label>
          <input
            className="input"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contacto-field flex flex-col gap-2 flex-1">
          <label>Apellido *</label>
          <input
            className="input"
            name="apellido"
            type="text"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contacto-field flex flex-col gap-2 flex-1">
          <label>Correo electrónico</label>
          <input
            className="input"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contacto-field flex flex-col gap-2 flex-1">
          <label>Motivo de consulta</label>
          <input
            className="input"
            name="motivo"
            type="text"
            value={form.motivo}
            onChange={handleChange}
          />
        </div>

        <div className="contacto-field flex flex-col gap-2 flex-1">
          <label>Descripción</label>
          <textarea
            className="textarea"
            name="descripcion"
            rows="5"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-contacto">
          Enviar consulta
        </button>
        <Popup
          title={titulo}
          isOpen={mostrarPopup}
          onClose={handleClosePopup}
          mensaje={mensaje}
        ></Popup>
      </form>
    </div>
  );
};
