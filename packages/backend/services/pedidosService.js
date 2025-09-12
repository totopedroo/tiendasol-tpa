import { Pedido } from "../models/entities/pedido.js";
import { DireccionEntrega } from "../models/entities/direccionEntrega.js";

export class PedidosService {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  create(nuevoPedidoJSON) {
    const d = nuevoPedidoJSON.direccionEntrega;
    const direccionEntrega = new DireccionEntrega(
      d.calle,
      d.altura,
      d.piso,
      d.departamento,
      d.codigoPostal,
      d.ciudad,
      d.provincia,
      d.pais
    );

    const nuevoPedido = new Pedido(
      nuevoPedidoJSON.id_comprador,
      nuevoPedidoJSON.moneda,
      direccionEntrega,
      nuevoPedidoJSON.items
    );

    if (!nuevoPedido.validarStock()) {
      throw new Error("No hay stock disponible para uno o más productos.");
    }

    nuevoPedido.calcularTotal();

    const pedidoGuardado = this.pedidoRepository.create(nuevoPedido);
    return pedidoGuardado;
  }

  findById(id) {
    return this.pedidoRepository.findById(id);
  }

  historialDelUsuario(userId) {
    return this.pedidoRepository.historialDelUsuario(userId);
  }

  findall(page, limit, filtros) {
    const numeroPagina = Math.max(Number(page), 1);
    const elementosPorPagina = Math.min(Math.max(Number(limit), 1), 100);

    const pedidos = this.pedidoRepository.findByPage(
      numeroPagina,
      elementosPorPagina,
      filtros
    );

    const total = this.pedidoRepository.contarTodos();
    const totalPaginas = Math.ceil(total / elementosPorPagina);

    return {
      pagina: numeroPagina,
      perPage: elementosPorPagina,
      total,
      totalPaginas,
      data: pedidos,
    };
  }

  cancelar(id) {
    return this.pedidoRepository.cancelar(id);
  }

  marcarEnviado(id) {
    return this.pedidoRepository.marcarEnviado(id);
  }
}
