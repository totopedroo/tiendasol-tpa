import { ProductoModel } from "../../schemas/productoSchema.js";

export class ProductoRepository {
    constructor() {
        this.model = ProductoModel;
    }

    async findByPage(pagina, elementosPorPagina, filtros) {
        return await this.findAll(filtros)
            .skip((pagina - 1) * elementosPorPagina)
            .limit(elementosPorPagina);
    }

    async findAll(filtros) {
        return await this.model.find(filtros);
    }

    /*   
    TODO:
    * ORDERNAR POR PRECIO ASCENDENTE Y DESCENDENTE
    * ORDENAMIENTO POR MAS VENDIDO -- CONSULTA DB
    * RANGO DE PRECIO
    * DOCUMENTACIÓN
    * PRUEBAS UNITARIAS
    */

    async contarTodos() {
        return await this.model.countDocuments();
    }
}