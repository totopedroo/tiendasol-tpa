import React, { useState } from "react";
import "./Vender.css";

export function Vender() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [moneda, setMoneda] = useState("ARS");
  const [categoria, setCategoria] = useState("");
  const [imagenes, setImagenes] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes((prev) => [...prev, ...files].slice(0, 10)); // máx. 10
  };

  const handleRemoveImage = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = {
      titulo,
      descripcion,
      precio,
      moneda,
      categoria,
      imagenes,
    };
    console.log("Publicación creada:", datos);
    alert("✅ Publicación creada correctamente");
  };

  return (
    <div className="vender-container">
      <h2>Vender producto</h2>

      <form className="vender-form" onSubmit={handleSubmit}>
        {/* --- Columna izquierda --- */}
        <div className="vender-col">
          <label>Título</label>
          <input
            type="text"
            placeholder="Texto"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label>Descripción</label>
          <textarea
            placeholder="Mínimo 500 caracteres"
            rows="8"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>

          <div className="vender-row">
            <div className="vender-precio">
              <label>Precio</label>
              <input
                type="number"
                placeholder="Texto"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </div>
            <div className="vender-moneda">
              <label>Moneda</label>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
              >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <label>Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="electrónica">Electrónica</option>
            <option value="hogar">Hogar</option>
            <option value="moda">Moda</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        {/* --- Columna derecha --- */}
        <div className="vender-col">
          <label>Multimedia</label>

          <div
            className="upload-box"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <div className="upload-icon">↑</div>
            <p>Arrastre archivos aquí</p>
            <span className="upload-or">o Click para buscar archivos</span>
            <small>(máximo 10 archivos, hasta 10MB)</small>
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </div>

          {imagenes.length > 0 && (
            <div className="preview-grid">
              {imagenes.map((file, index) => (
                <div key={index} className="preview-item">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="preview-img"
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="btn-publicar">
            Crear publicación
          </button>
        </div>
      </form>
    </div>
  );
}
