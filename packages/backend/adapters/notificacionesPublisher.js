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

    // La factory decide receptor y arma el cuerpo base del mensaje
    const noti = this.factory.crearSegunPedido(pedidoParaMensaje);

    // Etiqueta según requerimiento + motivo si es cancelado
    const etiquetas = {
      [ESTADO_PEDIDO.CONFIRMADO]: "Confirmación de pedido",
      [ESTADO_PEDIDO.ENVIADO]: "Aviso de pedido enviado",
      [ESTADO_PEDIDO.CANCELADO]: "Cancelación de pedido",
    };
    const titulo = etiquetas[estado] ?? `Pedido ${estado}`;
    const extra = estado === ESTADO_PEDIDO.CANCELADO && motivo ? `\nMotivo: ${motivo}` : "";
    const mensaje = `${titulo}\n${noti.mensaje}${extra}`.trim();

    // Resolver el id del receptor
    const usuarioDestino = getId(noti.usuarioDestino);

    // Persistir
    await this.notiService.agregar({
      usuarioDestino,
      mensaje,
      tipo: estado,
      pedido: pedido?._id,   // opcional: referencia al pedido
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