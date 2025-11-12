import mongoose from "mongoose";
import { Categoria } from "../models/entities/categoria.js";

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: "categorias",
  versionKey: false
});

categoriaSchema.loadClass(Categoria);

export const CategoriaModel = mongoose.model("Categoria", categoriaSchema);

