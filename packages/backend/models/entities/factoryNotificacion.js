import { ESTADO_PEDIDO } from "./estadoPedido.js";
import { Notificacion } from "./notificacion.js";
import { Pedido } from "./pedido.js";

export class FactoryNotificacion {
  /**
   *
   * @param {ESTADO_PEDIDO} estado
   * @returns {String}
   */

  /**
   *
   * @param {Pedido} pedido
   * @returns {Notificacion}
   */
  crearNotiVendedores(pedido) {
    const comprador = pedido.comprador;
    const nombreComprador = comprador?.nombre ?? "Cliente";

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
        .join("\n• ");

      const total = items.reduce((acc, i) => acc + i.cantidad * i.precioUnitario, 0);

      const mensaje =
        `Pedido de ${nombreComprador}\n` +
        `Productos:\n• ${productos}\n` +
        `Total: ${total}\n` +
        `Dirección de Entrega: ${formatDireccion(pedido.direccionEntrega)}`;

      notificaciones.push({
          usuarioDestino: vendedorId,
          mensaje
        });
    }
    return notificaciones;
  }

  crearNotiComprador(pedido) {
    const productos = (pedido.items ?? [])
      .map(i => `${i.producto.titulo ?? i.producto.nombre} (${i.cantidad})`)
      .join("\n• ");

    const mensaje =
      `Productos: ${productos}\n` +
      `Total: ${pedido.total}\n` +
      `Dirección de Entrega: ${formatDireccion(pedido.direccionEntrega)}`;

    return new Notificacion(pedido.comprador._id, mensaje);
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