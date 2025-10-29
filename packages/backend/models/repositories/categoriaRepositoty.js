import { CategoriaModel } from "../../schemas/categoriaSchema.js";

export class CategoriaRepository {
  constructor() {
    this.model = CategoriaModel;
  }

  async findAll() {
    return await this.model.find();
  }

  async save(data) {
    const Categoria = new this.model(data);
    const CategoriaGuardado = await Categoria.save();
    return await this.model
      .findById(CategoriaGuardado._id);
  }

  async findById(id) {
    return await this.model
      .findById(id);
  }

  async update(id, CategoriaModificado) {
    return await this.model
      .findByIdAndUpdate(id, CategoriaModificado, {
        new: true,
      });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

}
