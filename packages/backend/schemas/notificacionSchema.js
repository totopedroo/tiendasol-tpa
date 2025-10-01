import mongoose from "mongoose";
import { Notificacion } from "../models/entities/notificacion.js";
import { ESTADO_PEDIDO } from "../models/entities/estadoPedido.js";

const notificacionSchema = new mongoose.Schema(
  {
    usuarioDestino: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      index: true,
    },
    // referenciar el pedido que originó la notificación (OPCIONAL)
    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pedido",
      required: false,
      index: true,
    },
    // usamos el estado del pedido como tipo de notificación
    tipo: {
      type: String,
      enum: Object.values(ESTADO_PEDIDO),
      required: true,
    },
    mensaje: {
      type: String,
      trim: true,
      required: true,
    },
    leida: {
      type: Boolean,
      default: false,
      index: true,
    },
    fechaLeida: {
      type: Date,
      default: null,
    },
  },
  {
    // mapeamos createdAt a fechaAlta
    timestamps: { createdAt: "fechaAlta", updatedAt: false },
    collection: "notificaciones",
  }
);

// índices compuestos para las listas
notificacionSchema.index({ usuarioDestino: 1, leida: 1, fechaAlta: -1 });

// método de dominio
notificacionSchema.methods.marcarComoLeida = function () {
  if (!this.leida) {
    this.leida = true;
    this.fechaLeida = new Date();
  }
};

export const NotificacionModel = mongoose.model("Notificacion", notificacionSchema);