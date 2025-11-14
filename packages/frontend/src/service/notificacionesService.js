import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getNotificacionesUsuario = async (userId, params = {}) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/notificaciones`,
      {
        params,
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener notificaciones del usuario ${userId}:`,
      error
    );
    throw error;
  }
};

export const marcarNotificacionComoLeida = async (userId, notificacionId) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/${userId}/notificaciones/${notificacionId}/lectura`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al marcar notificación ${notificacionId} como leída:`,
      error
    );
    throw error;
  }
};
