import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getHistorialDeUsuario = async (
  userId,
  tipoVista = "comprador",
  page = 1,
  limit = 10,
  orden = "reciente"
) => {
  try {
    const tipoVistaParam =
      tipoVista === "vendedor" ? "&tipoVista=vendedor" : "";
    const response = await axios.get(
      `${API_BASE_URL}/pedidos?userId=${userId}${tipoVistaParam}&page=${page}&limit=${limit}&orden=${orden}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(`Error al buscar pedidos de usuario ID ${userId}:`, error);
    throw error;
  }
};

export const crearPedido = async (pedido) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pedidos`, pedido, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw error;
  }
};

export const cancelarPedido = async (
  pedidoId,
  motivo = "Cancelado por el usuario"
) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/pedidos/${pedidoId}?estado=CANCELADO`,
      { motivo },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cancelar el pedido:", error);
    throw error;
  }
};

export const cambiarEstadoPedido = async (
  pedidoId,
  nuevoEstado,
  motivo = null
) => {
  try {
    const body = motivo ? { motivo } : {};
    const response = await axios.patch(
      `${API_BASE_URL}/pedidos/${pedidoId}?estado=${nuevoEstado}`,
      body,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cambiar el estado del pedido:", error);
    throw error;
  }
};
