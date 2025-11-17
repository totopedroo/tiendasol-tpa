/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./DireccionModal.css";
import { Button } from "../button/Button";

export const DireccionModal = ({
  isOpen,
  onClose,
  onSave,
  direccionInicial,
}) => {
  const [formData, setFormData] = useState({
    calle: "",
    altura: "",
    piso: "",
    departamento: "",
    codigoPostal: "",
    ciudad: "",
    provincia: "",
    pais: "Argentina",
  });

  useEffect(() => {
    if (direccionInicial) {
      setFormData(direccionInicial);
    } else {
      setFormData({
        calle: "",
        altura: "",
        piso: "",
        departamento: "",
        codigoPostal: "",
        ciudad: "",
        provincia: "",
        pais: "Argentina",
      });
    }
  }, [direccionInicial, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (
      !formData.calle ||
      !formData.altura ||
      !formData.codigoPostal ||
      !formData.ciudad ||
      !formData.provincia ||
      !formData.pais
    ) {
      alert("Por favor, completa todos los campos obligatorios");
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {direccionInicial ? "Editar Dirección" : "Agregar Dirección"}
          </h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group flex-2">
              <label htmlFor="calle">Calle *</label>
              <input
                className="input"
                type="text"
                id="calle"
                name="calle"
                value={formData.calle}
                onChange={handleChange}
                placeholder="Ej: Av. Colón"
                required
              />
            </div>

            <div className="form-group flex-1">
              <label htmlFor="altura">Altura *</label>
              <input
                className="input"
                type="text"
                id="altura"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
                placeholder="Ej: 1234"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group ">
              <label htmlFor="piso">Piso</label>
              <input
                className="input"
                type="text"
                id="piso"
                name="piso"
                value={formData.piso}
                onChange={handleChange}
                placeholder="Ej: 5"
              />
            </div>

            <div className="form-group ">
              <label htmlFor="departamento">Departamento</label>
              <input
                className="input"
                type="text"
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                placeholder="Ej: A"
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigoPostal">Código Postal *</label>
              <input
                className="input"
                type="text"
                id="codigoPostal"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                placeholder="Ej: 5000"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad *</label>
              <input
                className="input"
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Ej: Córdoba"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="provincia">Provincia *</label>
              <input
                className="input"
                type="text"
                id="provincia"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                placeholder="Ej: Córdoba"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group ">
              <label htmlFor="pais">País *</label>
              <input
                className="input"
                type="text"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                placeholder="Ej: Argentina"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar Dirección
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
