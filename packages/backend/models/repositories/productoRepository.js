import { ProductoModel } from "../../schemas/productoSchema.js";
import { CategoriaModel } from "../../schemas/productoSchema.js";
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

    if (filtros.ordenVentas === "desc") {
      const pipeline = [
        { $match: filtrosMongo },
        {
          $lookup: {
            from: "itemPedidos",
            localField: "_id",
            foreignField: "producto",
            as: "itemsPedido",
          },
        },
        {
          $addFields: {
            idsItemsPedido: "$itemsPedido._id",
          },
        },

        // Buscar los Pedidos que contengan alguno de estos items y filtrar por estado CONFIRMADO o ENTREGADO
        {
          $lookup: {
            from: "pedidos",
            let: { itemsIds: "$idsItemsPedido" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $gt: [
                          {
                            $size: {
                              $setIntersection: ["$items", "$$itemsIds"],
                            },
                          },
                          0,
                        ],
                      },
                      {
                        $in: ["$estado", ["CONFIRMADO", "ENTREGADO"]],
                      },
                    ],
                  },
                },
              },
              { $project: { items: 1 } },
            ],
            as: "pedidosValidos",
          },
        },
        {
          $addFields: {
            itemsVendidos: {
              $filter: {
                input: "$itemsPedido",
                as: "item",
                cond: {
                  $in: [
                    "$$item._id",
                    {
                      $reduce: {
                        input: "$pedidosValidos.items",
                        initialValue: [],
                        in: { $concatArrays: ["$$value", "$$this"] },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $addFields: {
            totalVendido: {
              $sum: "$itemsVendidos.cantidad",
            },
          },
        },
        { $sort: { totalVendido: -1 } },
        {
          $lookup: {
            from: "categorias",
            localField: "categorias",
            foreignField: "_id",
            as: "categorias",
          },
        },
        { $skip: (pagina - 1) * elementosPorPagina },
        { $limit: elementosPorPagina },
        {
          $project: {
            itemsPedido: 0,
            idsItemsPedido: 0,
            pedidosValidos: 0,
            itemsVendidos: 0,
          },
        },
      ];

      return await this.model.aggregate(pipeline);
    }

    if (filtros.ordenPrecio) {
      if (filtros.ordenPrecio === "asc") {
        sort.precio = 1;
      } else if (filtros.ordenPrecio === "desc") {
        sort.precio = -1;
      }
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
    * ORDENAMIENTO POR MAS VENDIDO -- CONSULTA DB
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
