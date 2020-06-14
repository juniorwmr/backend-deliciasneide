const mongoose = require("mongoose");

const SaborSchema = new mongoose.Schema({
  pedido_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pedido",
    required: true,
  },
  sabor: {
    type: String,
    required: true,
  },
  qtd: {
    type: Number,
    default: 0,
  },
});

const Sabor = mongoose.model("Sabor", SaborSchema);

module.exports = Sabor;
