import { Producto } from "./Producto";

export class ItemPedido {
  /**
   *
   * @param {Producto} producto
   * @param {Number} cantidad Integer
   * @param {Number} precioUnitario Double
   */
  constructor(producto, cantidad, precioUnitario) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
  }

  /**
   * @returns {Number}
   */
  subtotal() {
    return this.cantidad * this.precioUnitario;
  }
}
