import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getHistorialDeUsuario = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/pedidos?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error al buscar pedidos de usuario ID ${userId}:`, error);
    throw error;
  }
};
