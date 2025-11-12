import mongoose from "mongoose";
import { MONEDA } from "../models/entities/moneda.js";
import { Producto } from "../models/entities/producto.js";
import { CategoriaModel } from "./categoriaSchema.js";

const productoSchema = new mongoose.Schema(
  {
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    titulo: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    moneda: {
      type: String,
      enum: Object.values(MONEDA),
      required: true,
    },
    activo: {
      type: Boolean,
      required: true,
    },
    categorias: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria'
    }],
    fotos: [{
      type: String, // URLs de las imágenes
      trim: true
    }],
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    ventas: { // se agrega el campo ventas para filtar por "mas vendido"
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true,
    collection: "productos"
  },
);


productoSchema.loadClass(Producto);

export const ProductoModel = mongoose.model("Producto", productoSchema);
