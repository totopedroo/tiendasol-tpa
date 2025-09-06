import { ESTADO_PEDIDO } from "./estadoPedido";
import { Pedido } from "./pedido";
import { Usuario } from "./usuario";

export class CambioEstadoPedido {
  /**
   *
   * @param {ESTADO_PEDIDO} estado
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
