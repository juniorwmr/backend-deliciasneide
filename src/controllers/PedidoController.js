const Pedido = require("../models/PedidoModel");

module.exports = {
  async index(req, res) {
    try {
      const pedidos = await Pedido.find({ status: false });
      return res.send({ pedidos });
    } catch (error) {
      next(error);
    }
  },
  async indexDeliveried(req, res) {
    try {
      const pedidos = await Pedido.find({ status: true });
      return res.send({ pedidos });
    } catch (error) {
      next(error);
    }
  },
  async create(req, res) {
    try {
      const pedido = await Pedido.create(req.body);
      return res.send({ pedido });
    } catch (error) {
      next(error);
    }
  },
  async updateStatus(req, res) {
    const { id } = req.params;
    const updated = Pedido.findByIdAndUpdate(
      { _id: id },
      { status: true },
      { new: true, runValidators: true }
    );
  },

  async delete(req, res) {
    const { pedido_id } = req.params;
    try {
      await Pedido.deleteOne({ _id: pedido_id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
};
