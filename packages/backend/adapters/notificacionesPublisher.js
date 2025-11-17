import { FactoryNotificacion } from "../models/entities/factoryNotificacion.js";
import { ESTADO_PEDIDO } from "../models/entities/estadoPedido.js";

/**
 * @typedef {import('../models/entities/cambioEstadoPedido.js').CambioEstadoPedido} CambioEstadoPedido
 */

export class NotificacionesPublisher {
  /**
   * @param {import('../services/notificacionesService.js').NotificacionesService} notiService
   * @param {FactoryNotificacion} [factory]
   */
  constructor(notiService, factory = new FactoryNotificacion()) {
    this.notiService = notiService;
    this.factory = factory;
  }

  /**
   * Publica una notificación cuando cambia el estado de un pedido.
   * @param {CambioEstadoPedido} cambio
   */
  async publicar(cambio) {
    const { pedido, estado, motivo, actorId } = cambio;

    const actorEsComprador =
      actorId?.toString() === pedido.comprador?._id?.toString();

    const etiquetas = {
      PENDIENTE: "Nuevo pedido recibido",
      CONFIRMADO: "Confirmación de pedido",
      EN_PREPARACION: "Pedido en preparación",
      ENVIADO: "Pedido enviado",
      ENTREGADO: "Pedido entregado",
      CANCELADO: "Cancelación de pedido",
    };

    const titulo = etiquetas[estado] ?? `Pedido ${estado}`;
    const extra = estado === "CANCELADO" && motivo ? `\nMotivo: ${motivo}` : "";

    // Si el comprador actuó, notificamos a los vendedores
    if (actorEsComprador) {
      const notificaciones = this.factory.crearNotiVendedores(pedido);

      for (const noti of notificaciones) {
        await this.notiService.agregar({
          usuarioDestino: noti.usuarioDestino,
          mensaje: `${titulo}\n${noti.mensaje}${extra}`,
          tipo: estado,
          pedido: pedido._id,
        });
      }
      return;
    }

    // Si el vendedor actuó, notificamos al comprador
    const notiComprador = this.factory.crearNotiComprador(pedido);

    await this.notiService.agregar({
      usuarioDestino: notiComprador.usuarioDestino,
      mensaje: `${titulo}\n${notiComprador.mensaje}${extra}`,
      tipo: estado,
      pedido: pedido._id,
    });
  }
}

/** Convierte documentos de Mongoose a POJO liso si hace falta */
function toPlain(obj) {
  return typeof obj?.toObject === "function" ? obj.toObject() : obj;
}

/** Obtiene _id|id|string de usuarios/documentos */
function getId(x) {
  return x?._id ?? x?.id ?? x;
}
