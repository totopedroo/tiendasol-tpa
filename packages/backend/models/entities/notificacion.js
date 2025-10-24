import { Usuario } from "./usuario.js";

export class Notificacion {
  /**
   *
   * @param {Usuario} usuarioDestino
   * @param {String} mensaje
   */
  constructor(usuarioDestino, mensaje) {
    this.usuarioDestino = usuarioDestino;
    this.mensaje = mensaje;

    this.id = ""; // TODO generar id
    this.fechaAlta = new Date();
    this.leida = false;
    this.fechaLeida = null;
  } //TODO borrar ya que se persiste en mongo, sin constructor, dejar marcarComoLeida() como método y cargarla con schema.loadClass? Preguntar.

  marcarComoLeida() {
    if (!this.leida) {
      this.leida = true;
      this.fechaLeida = new Date();
    }
  }
}
