import { NotificacionModel } from "../../schemas/notificacionSchema.js";

export class NotificacionesRepository {
  constructor() {
    this.model = NotificacionModel;
  }

  async agregar({ usuarioDestino, mensaje, tipo, pedido = null, fechaAlta }) {
  try {
    const doc = await this.model.create({
      usuarioDestino,
      mensaje,
      tipo,
      pedido,
      ...(fechaAlta ? { fechaAlta } : {}),
    });

  } catch (err) {
    console.error("❌ ERROR AL GUARDAR NOTIFICACION:", err);
    throw err;
  }
}

  async obtenerPorUsuario(userId, { leidas = false, limit = 50, afterId = null } = {}) {
    const filtro = {
      usuarioDestino: userId,
      leida: leidas,
      ...(afterId ? { _id: { $lt: afterId } } : {}),
    };
    return this.model
      .find(filtro)
      .sort({ fechaAlta: -1 })
      .limit(Number(limit));
  }

  async marcarComoLeida(userId, notificacionId) {
    return this.model.findOneAndUpdate(
      { _id: notificacionId, usuarioDestino: userId, leida: false },
      { $set: { leida: true, fechaLeida: new Date() } },
      { new: true }
    );
  }
}
