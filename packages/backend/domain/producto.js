import { Usuario } from "./usuario";
import { MONEDA } from "./moneda";

export class Producto {
  /**
   *
   * @param {Usuario} vendedor
   * @param {String} titulo
   * @param {String} descripcion
   * @param {Number} precio
   * @param {MONEDA} moneda
   * @param {Boolean} activo
   */
  constructor(vendedor, titulo, descripcion, precio, moneda, activo) {
    this.vendedor = vendedor;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.moneda = moneda;
    this.activo = activo;

    this.id = ""; // TODO generar id
    this.categorias = [];
    this.fotos = [];
    this.stock = 0;
  }

  /**
   *
   * @param {Number} cantidad
   * @returns {Boolean}
   */
  estaDisponible(cantidad) {
    return cantidad <= this.stock;
  }

  /**
   *
   * @param {Number} cantidad
   */
  reducirStock(cantidad) {
    this.stock -= cantidad;
  }

  /**
   *
   * @param {Number} cantidad
   */
  aumentarStock(cantidad) {
    this.stock += cantidad;
  }
}
