import { ESTADO_PEDIDO } from "../entities/estadoPedido.js";
import { PedidoModel } from "../../schemas/pedidoSchema.js";
import mongoose from "mongoose";

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
      select: null,
      populate: {
        path: "vendedor",
        select: "nombre email",
      },
    });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async getHistorialDeUsuario(
    userId,
    pagina = 1,
    elementosPorPagina = 10,
    ordenamiento = { createdAt: -1 }
  ) {
    return await this.model
      .find({ comprador: userId })
      .sort(ordenamiento)
      .skip((pagina - 1) * elementosPorPagina)
      .limit(elementosPorPagina);
  }

  async contarPedidosDeUsuario(userId) {
    return await this.model.countDocuments({ comprador: userId });
  }

  async getHistorialComoVendedor(
    userId,
    pagina = 1,
    elementosPorPagina = 10,
    ordenamiento = { createdAt: -1 }
  ) {
    // Obtener pedidos que contengan productos del vendedor
    return await this.model
      .find({
        "items.producto": {
          $in: await this.#getProductosDelVendedor(userId),
        },
      })
      .populate({
        path: "items.producto",
        select: "titulo precio moneda fotos vendedor stock",
        populate: {
          path: "vendedor",
          select: "nombre email",
        },
      })
      .populate({
        path: "comprador",
        select: "nombre email",
      })
      .sort(ordenamiento)
      .skip((pagina - 1) * elementosPorPagina)
      .limit(elementosPorPagina);
  }

  async contarPedidosComoVendedor(userId) {
    const productosIds = await this.#getProductosDelVendedor(userId);
    return await this.model.countDocuments({
      "items.producto": {
        $in: productosIds,
      },
    });
  }

  async #getProductosDelVendedor(userId) {
    const ProductoModel = mongoose.model("Producto");
    const productos = await ProductoModel.find({ vendedor: userId }).select(
      "_id"
    );
    return productos.map((p) => p._id);
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
    pedido.save();

    return await this._populatePedido(pedidoId);
  }

  async marcarEnviado(pedidoId, userId) {
    const pedido = await this.findById(pedidoId);
    if (!pedido) {
      return null;
    }
    pedido.actualizarEstado(ESTADO_PEDIDO.ENVIADO, userId, "Pedido enviado");
    await pedido.save();

    return await this._populatePedido(pedidoId);
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
    await pedido.save();

    return await this._populatePedido(pedidoId);
  }

  async marcarEnPreparacion(pedidoId, userId) {
    const pedido = await this.findById(pedidoId);
    if (!pedido) {
      return null;
    }
    pedido.actualizarEstado(
      ESTADO_PEDIDO.EN_PREPARACION,
      userId,
      "Pedido en preparación"
    );
    return await pedido.save();
  }

  async marcarEntregado(pedidoId, userId) {
    const pedido = await this.findById(pedidoId);
    if (!pedido) {
      return null;
    }
    pedido.actualizarEstado(
      ESTADO_PEDIDO.ENTREGADO,
      userId,
      "Pedido entregado"
    );
    return await pedido.save();
  }

  async contarTodos() {
    return await this.model.countDocuments();
  }

  async _populatePedido(id) {
  return this.model
    .findById(id)
    .populate({
      path: "items.producto",
      select: "nombre vendedor",
      populate: {
        path: "vendedor",
        select: "nombre email",
      },
    })
    .populate("comprador", "nombre email");
  }
}
