import mongoose from "mongoose";
import { Pedido } from "../models/entities/pedido.js";
import { ESTADO_PEDIDO } from "../models/entities/estadoPedido.js";
import { MONEDA } from "../models/entities/moneda.js";

const cambioEstadoPedidoSchema = new mongoose.Schema(
  {
    estado: {
      type: String,
      enum: Object.values(ESTADO_PEDIDO),
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    motivo: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const direccionEntregaSchema = new mongoose.Schema({
  calle: {
    type: String,
    trim: true,
  },
  altura: {
    type: String,
    trim: true,
  },
  piso: {
    type: String,
    trim: true,
    required: false,
  },
  departamento: {
    type: String,
    trim: true,
    required: false,
  },
  codigoPostal: {
    type: String,
    trim: true,
  },
  ciudad: {
    type: String,
    trim: true,
  },
  provincia: {
    type: String,
    trim: true,
  },
  pais: {
    type: String,
    trim: true,
  },
  latitud: {
    type: Number,
  },
  longitud: {
    type: Number,
  },
});

const itemPedidoEmbebidoSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    precioUnitario: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: true }, // Cada item tendrá su propio _id
);

const pedidoSchema = new mongoose.Schema(
  {
    comprador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    moneda: {
      type: String,
      enum: Object.values(MONEDA),
      required: true,
    },
    direccionEntrega: direccionEntregaSchema,
    items: [itemPedidoEmbebidoSchema],
    estado: {
      type: String,
      enum: Object.values(ESTADO_PEDIDO),
      required: true,
    },
    historialEstados: [cambioEstadoPedidoSchema],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: "pedidos",
  },
);

pedidoSchema.methods.actualizarEstado = function (
  nuevoEstado,
  usuario,
  motivo,
) {
  this.estado = nuevoEstado;
  this.historialEstados.push({
    estado: nuevoEstado,
    usuario: usuario,
    motivo: motivo,
  });
};

pedidoSchema.loadClass(Pedido);

export const PedidoModel = mongoose.model("Pedido", pedidoSchema);
