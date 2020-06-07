const express = require("express");
const router = express.Router();

const PedidoController = require("./controllers/PedidoController");

// Pedidos
router.get("/pedidos", PedidoController.index);
router.get("/pedidos/deliveried", PedidoController.indexDeliveried);
router.post("/pedidos", PedidoController.create);
// router.update("/pedidos/deliveried/:id", PedidoController.updateStatus);
router.delete("/pedidos/:pedido_id", PedidoController.delete);

module.exports = router;
