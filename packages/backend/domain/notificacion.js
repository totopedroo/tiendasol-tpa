import { Usuario } from "./Usuario";

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
  }

  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = new Date();
  }
}
