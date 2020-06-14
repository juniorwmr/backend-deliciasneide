const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sabores: [{ type: String, ref: "Sabor" }],
  address: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  taxa: {
    type: String,
    required: true,
  },
  change: {
    type: String,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = mongoose.model("Pedidos", PedidoSchema);

module.exports = Pedido;
