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
    if(pedido.estado === ESTADO_PEDIDO.ENVIADO) {
      // Intercambio de variables
      [receptor, emisor] = [emisor, receptor];
    }
    new Notificacion(
      receptor,
      `${this.crearSegunEstadoPedido(pedido.estado)} por ${emisor.nombre}\n
            Productos: ${pedido.items.forEach((i) => {
              `${i.producto} - ${i.cantidad} | `;
            })}\n
            Total: ${pedido.total}\n
            Dirección de entrega: ${pedido.direccionEntrega} 
            `,
    );
  }
}
