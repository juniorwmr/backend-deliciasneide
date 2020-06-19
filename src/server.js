require("dotenv").config();

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const admin = require('firebase-admin');
const cors = require("cors");
var serviceAccount = require("./deliciasneide-80b73-firebase-adminsdk-matjv-fac234a377.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://deliciasneide-80b73.firebaseio.com"
});

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
