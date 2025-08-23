import { EstadoPedido } from "./estadoPedido";
import { Pedido } from "./pedido";
import { Usuario } from "./usuario";

export class CambioEstadoPedido {
  /**
   *
   * @param {EstadoPedido} estado
   * @param {Pedido} pedido
   * @param {Usuario} usuario
   * @param {String} motivo
   */
  constructor(estado, pedido, usuario, motivo) {
    this.estado = estado;
    this.pedido = pedido;
    this.usuario = usuario;
    this.motivo = motivo;

    this.fecha = new Date();
  }
}
