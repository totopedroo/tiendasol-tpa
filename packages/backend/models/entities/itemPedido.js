import { Producto } from "./producto.js";

export class ItemPedido {
  /**
   *
   * @param {Producto} producto
   * @param {Number} cantidad Integer
   * @param {Number} precioUnitario Double
   */
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;

    this.precioUnitario = producto.precio;
    // this.precioUnitario = precioUnitario; 
  }

  /**
   * @returns {Number}
   */
  subtotal() {
    return this.cantidad * this.precioUnitario;
  }
}
