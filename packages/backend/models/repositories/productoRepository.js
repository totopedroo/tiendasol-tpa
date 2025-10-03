import { ProductoModel } from "../../schemas/productoSchema.js";
import mongoose from "mongoose";

export class ProductoRepository {
  constructor() {
    this.model = ProductoModel;
  }

  async findByPage(pagina, elementosPorPagina, filtros = {}) {
    const filtrosMongo = {};
    const sort = {};

    if (filtros.vendedor) {
      filtrosMongo["vendedor"] = filtros.vendedor;
    }

    if (filtros.titulo) {
      filtrosMongo.titulo = { $regex: filtros.titulo, $options: "i" };
    }

    if (filtros.descripcion) {
      filtrosMongo.descripcion = { $regex: filtros.descripcion, $options: "i" };
    }

    // if (filtros.categoria) {
    //     filtrosMongo.categorias = filtros.categoria;
    // }

    if (filtros.ordenPrecio) {
      if (filtros.ordenPrecio === "asc") {
        sort.precio = 1; 
      } else if (filtros.ordenPrecio === "desc") {
        sort.precio = -1; 
      }
    }

    if (filtros.precioMin != null || filtros.precioMax != null) {
      filtrosMongo.precio = {};
      if (filtros.precioMin != null)
        filtrosMongo.precio.$gte = filtros.precioMin;
      if (filtros.precioMax != null)
        filtrosMongo.precio.$lte = filtros.precioMax;
    }
    return await this.model
      .find(filtrosMongo).sort(sort)
      .skip((pagina - 1) * elementosPorPagina)
      .limit(elementosPorPagina);
  }

  async findAll(filtros = {}) {
    return await this.model.find(filtros);
  }

  /*   
    TODO:
    * ORDENAMIENTO POR MAS VENDIDO -- CONSULTA DB
    * Filtrar por categoria
    * DOCUMENTACIÓN
    * PRUEBAS UNITARIAS
    
    query para los filtros:
    {"vendedor.id": "<specified_vendedor_id>",
     "titulo": {"$regex": "<titulo_regex>", "$options": "i"},
     "descripcion": {"$regex": "<descripcion_regex>", "$options": "i"},
     "categorias": "<specified_categoria>", 
     "precio": {"$gte": <min_precio>, "$lte": <max_precio>}}
    */
  async contarTodos() {
    return await this.model.countDocuments();
  }
}
