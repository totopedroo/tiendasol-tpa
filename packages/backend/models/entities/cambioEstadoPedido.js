import { ESTADO_PEDIDO } from "./estadoPedido.js";
import { Pedido } from "./pedido.js";
import { Usuario } from "./usuario.js";

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
