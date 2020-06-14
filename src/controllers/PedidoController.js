const Pedido = require("../models/PedidoModel");
const Sabor = require("../models/SaborModel");

module.exports = {
  async index(req, res) {
    const { pedido_id } = req.params;
    try {
      if (pedido_id) {
        const pedido = await Pedido.findById(pedido_id).populate("sabores");
        return res.send({ pedido });
      }
      const pedidos = await Pedido.find({ status: false }).select('_id address created_at');
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
    const { name, phone, sabores, address, value, change, payment } = req.body;
    try {
      const pedido = await Pedido.create({
        name,
        phone,
        address,
        value,
        change,
        payment
      });

      await Promise.all(
        sabores.map(async (sabor) => {
          const pedidoSabor = new Sabor({ ...sabor, pedido_id: pedido._id });
          await pedidoSabor.save();
          pedido.sabores.push(pedidoSabor);
        })
      );

      await pedido.save();

      return res.send({ pedido });
    } catch (error) {
      next(error);
    }
  },
  async updateStatus(req, res) {
    try {
      const { pedido_id } = req.params;
      const updated = await Pedido.findByIdAndUpdate({ _id: pedido_id }, req.body, {
        new: true,
      });
      return res.send({ updated });
    } catch (error) {
      next(error);
    }
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
  async deleteAll(req, res) {
    try {
      await Pedido.deleteMany({});
      return res.send();
    } catch (error) {
      next(error);
    }
  },
};
