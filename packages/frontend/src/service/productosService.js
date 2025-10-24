import axios from "axios";
// productosService.js
// renderizado
export async function obtenerProductos() {
  const response = await fetch("http://localhost:8000/productos"); // cambiar la URL por un .env
  if (!response.ok) throw new Error("Error al obtener productos");
  const responseBody = await response.json();
  return responseBody.data;
}

/* 
TODO
    * Hacer varias llamadas con el FETCH
    * Pasar query params para hacer filtros
    * Detectar eventos:
        * Aplicar filtros
        * Sacar filtros
        * Cuando cambio de pagina   
*/


const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getProductos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los Productos", error);
    throw error;
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el Producto con id: ${id}:`, error);
    throw error;
  }
};

export const crearProducto = async (
  idProducto,
  Nombre,
  FechaInicio,
  FechaFin
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reserva`, {
      diaInicio: FechaInicio,
      diaFin: FechaFin,
      nombreHuesped: Nombre,
      productos: idProducto,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error al crear la reserva para el Producto con id: ${idProducto}:`,
      error
    );
    throw error;
  }
};
