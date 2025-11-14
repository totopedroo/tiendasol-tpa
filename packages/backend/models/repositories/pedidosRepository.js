import { ESTADO_PEDIDO } from "../entities/estadoPedido.js";
import { PedidoModel } from "../../schemas/pedidoSchema.js";

export class PedidosRepository {
  constructor() {
    this.model = PedidoModel;
  }

  async create(pedido) {
    const nuevoPedido = new this.model(pedido);
    await nuevoPedido.save();
    // Populate para tener la información del vendedor para las notificaciones
    return await this.model.findById(nuevoPedido._id).populate({
      path: "items.producto",
      select: "nombre vendedor",
      populate: {
        path: "vendedor",
        select: "nombre email",
      },
    });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async getHistorialDeUsuario(userId) {
    return await this.model.find({ comprador: userId });
  }

  async findByPage(pagina, elementosPorPagina, filtros) {
    return await this.findAll(filtros)
      .skip((pagina - 1) * elementosPorPagina)
      .limit(elementosPorPagina)
      .sort({ createdAt: -1 });
  }

  async findAll(filtros) {
    return await this.model.find(filtros);
  }

  async cancelar(pedidoId, userId, motivo) {
    const pedido = await this.findById(pedidoId);
    if (!pedido) {
      return null;
    }
    pedido.actualizarEstado(ESTADO_PEDIDO.CANCELADO, userId, motivo);
    return await pedido.save();
  }

  async marcarEnviado(pedidoId, userId) {
    const pedido = await this.findById(pedidoId);
    if (!pedido) {
      return null;
    }
    pedido.actualizarEstado(ESTADO_PEDIDO.ENVIADO, userId, "Pedido enviado");
    return await pedido.save();
  }

  async confirmar(pedidoId, userId) {
    const pedido = await this.model.findById(pedidoId);
    if (!pedido) return null;

    // Idempotencia y validación de transición
    if (pedido.estado === ESTADO_PEDIDO.CONFIRMADO) return pedido; // ya confirmado
    if (pedido.estado !== ESTADO_PEDIDO.PENDIENTE) return null; // transición inválida

    pedido.actualizarEstado(
      ESTADO_PEDIDO.CONFIRMADO,
      userId,
      "Pedido confirmado"
    );
    return await pedido.save();
  }

  async contarTodos() {
    return await this.model.countDocuments();
  }
}
