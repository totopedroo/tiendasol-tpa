import { ESTADO_PEDIDO } from "../entities/estadoPedido.js";
import { PedidoModel } from "../../schemas/pedidoSchema.js";

export class PedidosRepository {
  constructor() {
    this.model = PedidoModel;
  }

  async create(pedido) {
    const nuevoPedido = new this.model(pedido);
    return await nuevoPedido.save();
  }

  async findById(id) {
    return await this.model.findById({id})
  }

  async getHistorialDeUsuario(userId) {
    return await this.model.find({comprador: userId})
  }

  async findByPage(pagina, elementosPorPagina, filtros) {
    return await this.findAll(filtros)
      .skip((pagina - 1) * elementosPorPagina)
      .limit(elementosPorPagina)
      .sort({createdAt: -1 });
  }

  async findAll(filtros) {
    return await this.model.find(filtros);
  }

  async cancelar(pedidoId, motivo) {
    const pedido = await this.findById(pedidoId);
    if (!pedido) {
      return null;
    }
    pedido.actualizarEstado(ESTADO_PEDIDO.CANCELADO, null, motivo);
    return await pedido.save();
  }

  async marcarEnviado(pedidoId) {
    const pedido = await this.findById(pedidoId);
    if (!pedido) {
      return null;
    }
    pedido.actualizarEstado(ESTADO_PEDIDO.ENVIADO, null, "Pedido enviado");
    return await pedido.save();
  }

  async contarTodos() {
    return await this.model.countDocuments();
  }
}
