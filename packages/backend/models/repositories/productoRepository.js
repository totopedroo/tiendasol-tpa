import { ProductoModel } from "../../schemas/productoSchema.js";
import { CategoriaModel } from "../../schemas/categoriaSchema.js";
import { UsuarioModel } from "../../schemas/usuarioSchema.js";

export class ProductoRepository {
  constructor() {
    this.model = ProductoModel;
  }

  async findByPage(pagina, elementosPorPagina, filtros = {}) {
    const filtrosMongo = {};
    const sort = {};

    if (filtros.vendedor) {
      filtrosMongo.vendedor = filtros.vendedor;
    }

    if (filtros.titulo) {
      filtrosMongo.titulo = { $regex: filtros.titulo, $options: "i" };
    }

    if (filtros.descripcion) {
      filtrosMongo.descripcion = { $regex: filtros.descripcion, $options: "i" };
    }

    if (filtros.categoria) {
      // Soportamos formato ?categorias=elec,ropa o categoria=elec&categoria=ropa
      const categorias = Array.isArray(filtros.categoria)
        ? filtros.categoria
        : filtros.categoria.split(",");
      console.log(categorias);

      // Buscamos IDs de categorías que hagan match con regex
      const categoriasDocs = await CategoriaModel.find({
        nombre: {
          $in: categorias.map((categoria) => new RegExp(categoria, "i")),
        },
      });

      const idsCategorias = categoriasDocs.map((cat) => cat._id);

      filtrosMongo.categorias = { $in: idsCategorias };
    }

    if (filtros.precioMin != null || filtros.precioMax != null) {
      filtrosMongo.precio = {};
      if (filtros.precioMin != null)
        filtrosMongo.precio.$gte = filtros.precioMin;
      if (filtros.precioMax != null)
        filtrosMongo.precio.$lte = filtros.precioMax;
    }

    if (filtros.ordenPor === "MayorPrecio") {
      sort.precio = -1;
    }
    if (filtros.ordenPor === "MenorPrecio") {
      sort.precio = 1;
    }
    if (filtros.ordenPor === "MasVendidos") {
      sort.ventas = -1;
    }

    return await this.model
      .find(filtrosMongo)
      .populate("categorias")
      .populate("vendedor")
      .sort(sort)
      .skip((pagina - 1) * elementosPorPagina)
      .limit(elementosPorPagina);
  }

  async findAll(filtros = {}) {
    return await this.model.find(filtros);
  }

  async save(data) {
    const producto = new this.model(data);
    const productoGuardado = await producto.save();
    return await this.model
      .findById(productoGuardado._id)
      .populate("categorias")
      .populate("vendedor");
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .populate("categorias")
      .populate("vendedor");
  }

  async update(id, productoModificado) {
    return await this.model
      .findByIdAndUpdate(id, productoModificado, {
        new: true,
      })
      .populate("categorias")
      .populate("vendedor");
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  /*   
    TODO:
    * Agregar logica para que otra entidad aumente la cantidad de ventas del "Producto"
  */

  async contarTodos() {
    return await this.model.countDocuments();
  }
}
