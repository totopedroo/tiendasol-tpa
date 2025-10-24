import { Usuario } from "./usuario.js";
import { MONEDA } from "./moneda.js";
import { DireccionEntrega } from "./direccionEntrega.js";
import { ESTADO_PEDIDO } from "./estadoPedido.js";
import { CambioEstadoPedido } from "./cambioEstadoPedido.js";

export class Pedido {
  id;
  comprador;
  moneda;
  direccionEntrega;
  items;

  total = 0;
  estado = ESTADO_PEDIDO.PENDIENTE;
  historialEstados = [];
  fechaCreacion = new Date();

  /**
   * @param {Usuario} comprador
   * @param {MONEDA} moneda
   * @param {DireccionEntrega} direccionEntrega
   */
  constructor(comprador, moneda, direccionEntrega, items) {
    this.comprador = comprador;
    this.moneda = moneda;
    this.direccionEntrega = direccionEntrega;
    this.items = items;
  }

  /**
   * @return {Number}
   */
  calcularTotal() {
    this.total = this.items
      .map((item) => item.subtotal())
      .reduce((suma, valorActual) => suma + valorActual, 0);
    return this.total;
  }

  /**
   * @param {ESTADO_PEDIDO} nuevoEstado
   * @param {Usuario} quien
   * @param {String} motivo
   */
  actualizarEstado(nuevoEstado, quien, motivo) {
    const cambioEstado = new CambioEstadoPedido(
      nuevoEstado,
      this,
      quien,
      motivo,
    );
    this.estado = nuevoEstado;
    this.historialEstados.push(cambioEstado);
  }

  /**
   * @return {Boolean}
   */
  validarStock() {
    // return Boolean
    return this.items.every((item) =>
      item.producto.estaDisponible(item.cantidad),
    );
  }

  /**
   * @param {ItemPedido} item
   */
  agregarItem(item) {
    this.items.push(item);
  }

  /**
   * @param {ItemPedido} item
   */
  eliminarItem(item) {
    const indice = this.items.indexOf(item);
    this.items.splice(indice, 1);
  }
}
