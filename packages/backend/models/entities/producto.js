import { Usuario } from "./usuario.js";
import { MONEDA } from "./moneda.js";
import { NegativeValueError } from "../../error/appError.js";

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
    if(precio < 0){
      throw new NegativeValueError("El valor del precio de un producto no puede ser negativo");
    }
    this.precio = precio;
    this.moneda = moneda;
    this.activo = activo;

    this.id = ""; // TODO generar id
    this.categorias = [];
    this.fotos = [];
    this.stock = 0;
    this.ventas = 0;
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
