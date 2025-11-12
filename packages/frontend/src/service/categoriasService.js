import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo las Categorías", error);
    throw error;
  }
};

export const getCategoriaById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la Categoría con id: ${id}:`, error);
    throw error;
  }
};

export const createCategoria = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/categorias`, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};

export const updateCategoria = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/categorias/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la categoría con id: ${id}:`, error);
    throw error;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la categoría con id: ${id}:`, error);
    throw error;
  }
};

