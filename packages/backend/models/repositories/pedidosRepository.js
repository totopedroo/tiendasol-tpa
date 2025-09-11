import { ESTADO_PEDIDO } from "../entities/estadoPedido.js";

export class PedidosRepository {
  constructor() {
    this.pedidos = [];
    this.nextId = 1;
  }

  create(pedido) {
    pedido.id = this.nextId++;
    this.pedidos.push(pedido);
    return pedido;
  }

  findById(id) {
    return this.pedidos.find((p) => p.id === id) || null;
  }

  historialDelUsuario(userId) {
    const historial = this.pedidos.filter((p) => p.id_comprador === userId);
    if (historial.length === 0) {
      return null;
    }
    return historial;
  }

  findByPage(pagina, elementosPorPagina, filtros) {
    const offset = (pagina - 1) * elementosPorPagina;
    const pedidos = this.findall(filtros);
    return pedidos.slice(offset, offset + elementosPorPagina);
  }

  findall(filtros) {
    // ver tema filtros mas tarde
    // const { estado, id_comprador, moneda, fechaDesde, fechaHasta, minTotal, maxTotal } = filtros;
    let pedidosADevolver = this.pedidos;
    return pedidosADevolver;
  }

  cancelar(id, motivo) {
    const pedido = this.findById(pedidoId);
    if (!pedido) {
      return null;
    }
    pedido.actualizarEstado(ESTADO_PEDIDO.CANCELADO, null, motivo);
    return pedido;
  }

  marcarEnviado(id) {
    const pedido = this.findById(id);
    if (!pedido) {
      return null;
    }
    pedido.actualizarEstado(ESTADO_PEDIDO.ENVIADO, null, "Pedido enviado");
    return pedido;
  }
}
