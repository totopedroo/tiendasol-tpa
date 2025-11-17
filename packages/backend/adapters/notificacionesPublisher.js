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
    const { pedido, estado, motivo } = cambio;

    // No mutamos el pedido original: clon + estado actualizado solo para el mensaje
    const pedidoPlano = toPlain(pedido);
    const pedidoParaMensaje = { ...pedidoPlano, estado };

    // Array de notificaciones
    const notificaciones = this.factory.crearSegunPedido(pedidoParaMensaje);

    // Etiqueta según requerimiento + motivo si es cancelado
    const etiquetas = {
      [ESTADO_PEDIDO.PENDIENTE]: "Nuevo pedido recibido",
      [ESTADO_PEDIDO.CONFIRMADO]: "Confirmación de pedido",
      [ESTADO_PEDIDO.ENVIADO]: "Aviso de pedido enviado",
      [ESTADO_PEDIDO.CANCELADO]: "Cancelación de pedido",
    };
    const titulo = etiquetas[estado] ?? `Pedido ${estado}`;
    const extra =
      estado === ESTADO_PEDIDO.CANCELADO && motivo ? `\nMotivo: ${motivo}` : "";
      
    // Publicar para CADA vendedor
    for (const noti of notificaciones) {
      const mensaje = `${titulo}\n${noti.mensaje}${extra}`.trim();
      const usuarioDestino = getId(noti.usuarioDestino);

      await this.notiService.agregar({
        usuarioDestino,
        mensaje,
        tipo: estado,
        pedido: pedido?._id,
      });
    }
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
