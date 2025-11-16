import React, { useState, useEffect } from "react";
import "./Vender.css";
import Popup from "../../components/popups/PopUp";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router";
import { createProducto } from "../../service/productosService";
import { getCategorias } from "../../service/categoriasService";
import { convertirAVendedor } from "../../service/usuariosService";
import { useAuth } from "../../context/AuthContexto";

export function Vender() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [moneda, setMoneda] = useState("PESO_ARG");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tituloPopup, setTituloPopup] = useState("");
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [convirtiendoAVendedor, setConvirtiendoAVendedor] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, openAuthModal, refreshUser } = useAuth();

  // Cargar categorías del backend
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await getCategorias();
        setCategorias(response.categorias || []);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        setCategorias([]);
      }
    };
    cargarCategorias();
  }, []);

  const handleClosePopup = () => {
    setMostrarPopup(false);
    if (tituloPopup === "Venta exitosa") {
      navigate("/");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes((prev) => [...prev, ...files].slice(0, 10)); // máx. 10
  };

  const handleRemoveImage = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el usuario esté autenticado
    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }

    // Validar campos
    if (!titulo || !descripcion || !precio || !stock || !categoria) {
      setTituloPopup("Error");
      setMensaje("⚠️ Por favor completa todos los campos requeridos.");
      setMostrarPopup(true);
      return;
    }

    setLoading(true);

    try {
      // Preparar datos del producto
      const productoData = {
        vendedor: user.id, // ID del usuario autenticado
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        precio: parseFloat(precio),
        moneda: moneda,
        activo: true,
        categorias: [categoria], // Array de IDs de categorías
        fotos: imagenes.map((img) => URL.createObjectURL(img)), // URLs temporales
        stock: parseInt(stock),
      };

      // Enviar al backend
      const response = await createProducto(productoData);

      console.log("Producto creado:", response);
      setTituloPopup("Venta exitosa");
      setMensaje("✅ Tu producto ha sido publicado con éxito!");
      setMostrarPopup(true);

      // Limpiar formulario
      setTitulo("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setCategoria("");
      setImagenes([]);
    } catch (error) {
      console.error("Error al crear producto:", error);
      setTituloPopup("Error");
      setMensaje(
        `⚠️ ${error.response?.data?.message || "Error al crear el producto. Intenta nuevamente."}`
      );
      setMostrarPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertirAVendedor = async () => {
    setConvirtiendoAVendedor(true);
    try {
      await convertirAVendedor(user.id);
      setTituloPopup("¡Éxito!");
      setMensaje(
        "✅ ¡Tu cuenta ha sido convertida a vendedor! Ya puedes publicar productos."
      );
      setMostrarPopup(true);

      // Actualizar el usuario en el contexto
      if (refreshUser) {
        await refreshUser();
      }
    } catch (error) {
      console.error("Error al convertir a vendedor:", error);
      setTituloPopup("Error");
      setMensaje(
        `⚠️ ${error.response?.data?.message || "Error al convertir la cuenta. Intenta nuevamente."}`
      );
      setMostrarPopup(true);
    } finally {
      setConvirtiendoAVendedor(false);
    }
  };

  const esComprador = user?.tipo === "COMPRADOR";

  return (
    <div className="vender-container flex flex-col gap-6">
      <h2>Vender producto</h2>

      {isAuthenticated && esComprador && (
        <div className="banner-comprador">
          <div className="banner-content flex flex-col gap-4 items-center text-center">
            <h3>Necesitas ser vendedor</h3>
            <p>
              Para poder vender productos necesitas convertir tu cuenta a tipo
              Vendedor.
            </p>
            <Button
              variant="primary"
              size="large"
              onClick={handleConvertirAVendedor}
              loading={convirtiendoAVendedor}
            >
              Convertir a Vendedor
            </Button>
          </div>
        </div>
      )}

      <form
        className="vender-form flex gap-8 flex-wrap"
        onSubmit={handleSubmit}
      >
        {/* --- Columna izquierda --- */}
        <div className="vender-col flex flex-col gap-4 flex-1">
          <label>Título</label>
          <input
            className="input"
            type="text"
            placeholder="Texto"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            disabled={esComprador}
          />

          <label>Descripción</label>
          <textarea
            className="textarea"
            placeholder="Mínimo 500 caracteres"
            rows="8"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            minLength={500}
            required
            disabled={esComprador}
          ></textarea>

          <div className="vender-row flex gap-4">
            <div className="vender-precio">
              <label>Precio</label>
              <input
                className="input"
                type="number"
                placeholder="Ingrese precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                min="0"
                required
                disabled={esComprador}
              />
            </div>
            <div className="vender-moneda">
              <label>Moneda</label>
              <select
                className="select"
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
                disabled={esComprador}
              >
                <option value="PESO_ARG">ARS</option>
                <option value="DOLAR_USA">USD</option>
                <option value="REAL">REAL</option>
              </select>
            </div>
          </div>

          <label>Stock</label>
          <input
            className="input"
            type="number"
            placeholder="Cantidad disponible"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min="1"
            required
            disabled={esComprador}
          />

          <label>Categoría</label>
          <select
            className="select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            disabled={esComprador}
          >
            <option value="">Seleccionar</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* --- Columna derecha --- */}
        <div className="vender-col flex flex-col gap-4 flex-1">
          <label>Multimedia</label>

          <div
            className={`upload-box ${esComprador ? "disabled" : ""}`}
            onClick={() =>
              !esComprador && document.getElementById("fileInput").click()
            }
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
              disabled={esComprador}
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

          <button
            type="submit"
            className="btn-publicar self-start"
            disabled={loading || esComprador}
          >
            {loading ? "Creando..." : "Crear publicación"}
          </button>

          <Popup
            title={tituloPopup}
            isOpen={mostrarPopup}
            onClose={handleClosePopup}
            mensaje={mensaje}
          />
        </div>
      </form>
    </div>
  );
}
