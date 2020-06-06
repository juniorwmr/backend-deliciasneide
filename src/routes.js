const express = require("express");
const router = express.Router();

const PedidoController = require("./controllers/PedidoController");

// Pedidos
router.get("/pedidos", PedidoController.index);
router.post("/pedidos", PedidoController.create);
router.delete("/pedidos/:pedido_id", PedidoController.delete);

module.exports = router;
