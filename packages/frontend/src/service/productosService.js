import { productos } from "../mockdata/Productos";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getProductsSlowly = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 800);
  });

export async function obtenerProductos() {
  const response = await fetch("http://localhost:8000/productos"); // cambiar la URL por un .env
  if (!response.ok) throw new Error("Error al obtener productos");
  const responseBody = await response.json();
  return responseBody.data;
}

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



// params es un objeto con los parámetros de la búsqueda
// ver documentacion de la API en /docs/api-docs.yaml
export const buscarProductos = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/productos`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar productos:", error);
    throw error;
  }
};
