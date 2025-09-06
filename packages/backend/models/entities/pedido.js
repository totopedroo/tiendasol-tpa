import { Usuario } from "./usuario";
import { MONEDA } from "./moneda";
import { DireccionEntrega } from "./direccionEntrega";
import { ESTADO_PEDIDO } from "./estadoPedido";
import { CambioEstadoPedido } from "./cambioEstadoPedido";

export class Pedido {
  
  /**
   *
   * @param {Usuario} comprador
   * @param {MONEDA} moneda
   * @param {DireccionEntrega} direccionEntrega
   */
  constructor(comprador, moneda, direccionEntrega) {
    this.comprador = comprador;
    this.moneda = moneda;
    this.direccionEntrega = direccionEntrega;

    this.id = ""; // TODO generar un id
    this.total = 0;
    this.items = []; // TODO ver si la lista la pasamos de una o si la vamos llenando
    this.estado = ESTADO_PEDIDO.PENDIENTE;
    this.fechaCreacion = new Date();
    this.historialEstados = [];
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
      motivo
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
      item.producto.estaDisponible(item.cantidad)
    );
  }
}
