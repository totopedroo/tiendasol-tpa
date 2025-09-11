import { Pedido } from "../models/entities/pedido.js";
import { DireccionEntrega } from "../models/enities/direccionEntrega.js";

export class PedidosService {


  constructor(pedidoRepository) {



    this.pedidoRepository = pedidoRpository;



  }



  create(nuevoPedidoJSON) {



   const direccionEntrega = new DireccionEn
rega(



    nuevoPedidoJSON.direccionEntrega.calle,


     nuevoPedidoJSON.direccionEntr
a.altura,


      nuevoPedidoJSON.direci
nEnrega.piso,


      nuevoPedidoJSON.direc
ionEntrega.departamento,



     nuevoPedidoJSON.direcionEntrega.codigoPostal,


     nuevoPedidoJSON.direccionEntrega.ciudad,




     nuevoPedidoJSON.direcconEntrega.provincia,



     nuevoPedidoJSONdireccionEntrega.pais,


   );







    // Creamos e
 pedido


   
const nuevoPedido = new Pedido(


      nuevoPedidoJSON.id_compra
or,


      nuevoPedidoJSON.mone
a,



     direccionEntrega,


      nuevoPedidoJSON.items




   );






    if (!nuevo
edido.validarStock()) {



     throw new Error("No hay stock disponible para uno o más productos.");


    }







    nuevoPedido.calcularTotal();







    //
Guardamos el pedido en el repo



   const pedidoGuardado = this.pedidoRepository.create(nuevoPedido);


    return pedidoGuardado;



  }







  findById(id) {



 
  return this.pedidoRepository.findById(id);

  }



  historialDelUsuario(userId) {

    const pedidosUsuario = this.pedidoRepository.historialDelUsuario(userId);

    return pedidosUsuario;

  }



  findall(page, limit, filtros) {

    const numeroPagina = Math.max(Number(page), 1);

    const elementosPorPagina = Math.min(Math.max(Number(limit), 1), 100);



    const pedidos = this.pedidosRepository.findByPage(

      numeroPagina,

      elementosPorPagina,

      filtros,

    );



    const total = this.pedidoRepository.contarTodos();

    const totalPaginas = Math.ceil(total / elementosPorPagina);



    return {

      pagina: numeroPagina,

      perPage: elementosXPagina,

      total: total,

      totalPaginas: totalPaginas,

      data: pedidos,

    };

  }



  cancelar(id) {

    const pedido = this.pedidoRepository.cancelar(id);

    return pedido;

  }



  marcarEnviado(id) {

    const pedido = this.pedidoRepository.marcarEnviado(id);

    return pedido;

  }

}

