const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  sabores: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  value: {
    type: String,
    require: true,
  },
  change: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  phone: {
    type: Boolean,
    require: true,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = mongoose.model("Pedidos", PedidoSchema);

module.exports = Pedido;
