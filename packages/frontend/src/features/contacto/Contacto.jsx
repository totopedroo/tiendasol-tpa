import React, { useState } from "react";
import "./Contacto.css";

export const Contacto = () => {
  // 🔹 Más adelante, este nombre puede venir de contexto o backend
  const nombreCliente = "Juan Martinez"; // ejemplo temporal

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    motivo: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Consulta enviada correctamente ✅");
  };

  return (
    <div className="contacto-container">
      <h2 className="contacto-title">
        Hola, <span className="cliente">{nombreCliente}</span>! Envíanos tu consulta
      </h2>

      <form className="contacto-form" onSubmit={handleSubmit}>
        <div className="contacto-field">
          <label>Nombre *</label>
          <input
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contacto-field">
          <label>Apellido *</label>
          <input
            name="apellido"
            type="text"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contacto-field">
          <label>Correo electrónico</label>
          <input
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contacto-field">
          <label>Motivo de consulta</label>
          <input
            name="motivo"
            type="text"
            value={form.motivo}
            onChange={handleChange}
          />
        </div>

        <div className="contacto-field">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            rows="5"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-contacto">
          Enviar consulta
        </button>
      </form>
    </div>
  );
};
