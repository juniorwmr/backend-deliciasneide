const express = require("express");
const router = express.Router();

const PedidoController = require("./controllers/PedidoController");

// Pedidos
router.get("/pedidos", PedidoController.findAddress);
router.get('/notification', PedidoController.sendNotification);
router.get("/pedidos/deliveried", PedidoController.findDeliveried);
router.post("/pedidos", PedidoController.create);
router.put("/pedidos/deliveried/:pedido_id", PedidoController.updateStatus);
router.delete("/pedidos/:pedido_id", PedidoController.delete);
router.delete("/pedidos", PedidoController.deleteAll);

module.exports = router;
