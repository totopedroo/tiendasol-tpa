import { ESTADO_PEDIDO } from "./ESTADO_PEDIDO";
import { Notificacion } from "./Notificacion";
import { Pedido } from "./Pedido";

export class FactoryNotificacion {
  /**
   *
   * @param {ESTADO_PEDIDO} estado
   * @returns {String}
   */
  crearSegunEstadoPedido(estado) {
    switch (estado) {
      case EstadoPedido.ENVIADO:
        return "Se envió el pedido";
      case EstadoPedido.CANCELADO:
        return "Se canceló el pedido";
    }
    return ""; // TODO armar el string
  }

  /**
   *
   * @param {Pedido} pedido
   * @returns {Notificacion}
   */
  crearSegunPedido(pedido) {
    // foreach pedido.items (i => i.vendedor)
    const vendedor = null; // TODO ver como acceder al vendedor
    return new Notificacion(
      vendedor,
      `Pedido realizado por ${pedido.comprador.nombre}\n
            Productos: ${pedido.items.forEach((i) => {
              `${i.producto} - ${i.cantidad} | `;
            })}\n
            Total: ${pedido.total}\n
            Dirección de entrega: ${pedido.direccionEntrega} 
            `,
    );
  }
}
