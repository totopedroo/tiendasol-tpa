import mongoose from "mongoose";
import { TIPO_USUARIO } from "../models/entities/tipoUsuario.js";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    telefono: {
      type: String,
      trim: true,
      required: true,
    },
    tipo: {
      type: String,
      enum: Object.values(TIPO_USUARIO),
      required: true,
    },
    fechaAlta: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true,
    collection: "usuarios"
  },
);

export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);