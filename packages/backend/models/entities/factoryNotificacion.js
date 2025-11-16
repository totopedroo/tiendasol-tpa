import { ESTADO_PEDIDO } from "./estadoPedido.js";
import { Notificacion } from "./notificacion.js";
import { Pedido } from "./pedido.js";

export class FactoryNotificacion {
  /**
   *
   * @param {ESTADO_PEDIDO} estado
   * @returns {String}
   */
  crearSegunEstadoPedido(estado) {
    return `Pedido ${estado}`;
  }

  /**
   *
   * @param {Pedido} pedido
   * @returns {Notificacion}
   */
  crearSegunPedido(pedido) {
    const comprador = pedido.comprador;
    const nombreEmisor = comprador?.nombre ?? "Cliente";

    // Agrupar items por vendedor
    const itemsPorVendedor = new Map();

    for (const item of pedido.items ?? []) {
      const vendedorId = item.producto?.vendedor?._id?.toString();
      if (!vendedorId) continue;

      if (!itemsPorVendedor.has(vendedorId)) {
        itemsPorVendedor.set(vendedorId, []);
      }

      itemsPorVendedor.get(vendedorId).push(item);
    }

    // Crear una notificación por vendedor
    const notificaciones = [];

    for (const [vendedorId, items] of itemsPorVendedor.entries()) {
      
      const productos = items
        .map(i => `${i.producto.titulo} (${i.cantidad})`)
        .join(" \n • ");

    const mensaje =
      `${this.crearSegunEstadoPedido(pedido.estado)} por ${nombreEmisor}\n` +
      `Productos: ${productos}\n` +
      `Total: ${items.reduce((acc, i) => acc + (i.cantidad * i.precioUnitario), 0)}\n` +
      `Dirección de entrega: ${formatDireccion(pedido.direccionEntrega)}`;

   notificaciones.push({
        usuarioDestino: vendedorId,
        mensaje
      });
    }

    return notificaciones;
  }
}

function formatDireccion(dir, decimals = 6) {
  if (!dir) return "";
  const principal = [
    dir.calle, dir.altura, dir.piso, dir.departamento,
    dir.ciudad, dir.provincia, dir.pais, dir.codigoPostal
  ].filter(Boolean).join(" ");

  const hasLat = dir.latitud !== null && dir.latitud !== undefined;
  const hasLng = dir.longitud !== null && dir.longitud !== undefined;
  const coords = (hasLat || hasLng)
    ? `(${hasLat ? Number(dir.latitud).toFixed(decimals) : "?"}, ${hasLng ? Number(dir.longitud).toFixed(decimals) : "?"})`
    : "";

  return [principal, coords].filter(Boolean).join(" ");
}