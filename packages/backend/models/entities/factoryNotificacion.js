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
    var receptor = pedido.items.at(0).producto.vendedor;
    var emisor = pedido.comprador;
    if (pedido.estado === ESTADO_PEDIDO.ENVIADO) {
      // Intercambio de variables
      [receptor, emisor] = [emisor, receptor];
    }

    const productos = (pedido.items ?? [])
      .map(i => `${i.producto?.nombre ?? i.producto} - ${i.cantidad}`)
      .join(" | ");

    const mensaje =
      `${this.crearSegunEstadoPedido(pedido.estado)} por ${emisor?.nombre}\n` +
      `Productos: ${productos}\n` +
      `Total: ${pedido.total}\n` +
      `Dirección de entrega: ${formatDireccion(pedido.direccionEntrega)}`;

    return new Notificacion(receptor, mensaje);
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