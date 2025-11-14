import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getVendedores = async (params = {}) => {
  try {
    // Siempre agregamos tipo: "VENDEDOR" al params
    const response = await axios.get(`${API_BASE_URL}/usuarios`, {
      params: { ...params, tipo: "VENDEDOR" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    throw error;
  }
};

export const getUsuarioById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la Usuario con id: ${id}:`, error);
    throw error;
  }
};

export const createUsuario = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, data);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

export const updateUsuario = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/usuarios/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario con id: ${id}:`, error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el usuario con id: ${id}:`, error);
    throw error;
  }
};

export const convertirAVendedor = async (id) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/usuarios/${id}`,
      { tipo: "VENDEDOR" },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(`Error al convertir usuario a vendedor:`, error);
    throw error;
  }
};

export const convertirAComprador = async (id) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/usuarios/${id}`,
      { tipo: "COMPRADOR" },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(`Error al convertir usuario a comprador:`, error);
    throw error;
  }
};
