import mongoose from "mongoose";
import { ItemPedido } from "../models/entities/itemPedido.js";

const itemPedidoSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precioUnitario: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "itemPedidos"
  },
);


itemPedidoSchema.loadClass(ItemPedido);

export const ItemPedidoModel = mongoose.model("ItemPedido", itemPedidoSchema);
