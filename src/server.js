require("dotenv").config();

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { setupWebSocket } = require("./socket");
const routes = require("./routes");
const errors = require("./errors");

const app = express();
const httpServer = http.Server(app);
// Unindo Socket com Servidor Htttp
setupWebSocket(httpServer);
// Iniciando o DB
var mongoDB = process.env.MONGO_URL;
mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Database is ON!");
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors.NotFound);
app.use(errors.CatchAll);

httpServer.listen(process.env.PORT || 3333);
