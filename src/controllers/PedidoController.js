const Pedido = require("../models/PedidoModel");
const Sabor = require("../models/SaborModel");
const { sendMessage } = require("../socket");
const admin = require('firebase-admin');
const fetch = require('node-fetch');

module.exports = {
  async sendNotification(req, res) {
      admin.database()
            .ref('/users')
            .once('value')
            .then(snapshot => {
              messages = []
              snapshot.forEach(childSnapshot => {
                var expoToken = childSnapshot.val().expoToken
                if (expoToken) {
                  messages.push({
                    sound: 'default',
                    to: expoToken,
                    body: 'Um novo pedido chegou, confira!'
                  })
                }
              })
              return Promise.all(messages)
            }).then(messages => {
              fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(messages)
              })
            })
  },
  async findAddress(req, res) {
    try {
      const pedidos = await Pedido.find().where('status').equals(false).populate("sabores");
      return res.send({ pedidos });
    } catch (error) {
      next(error);
    }
  },
  async findDeliveried(req, res) {
    try {
      const pedidos = await Pedido.find().where('status').equals(true).populate("sabores");
      return res.send({ pedidos });
    } catch (error) {
      next(error);
    }
  },
  async create(req, res) {
    const { name, phone, sabores, address, value, change, payment, taxa } = req.body;
    try {
      const pedido = await Pedido.create({
        name,
        phone,
        address,
        value,
        taxa,
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
      sendMessage("new-pedido", pedido);
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
