require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const errors = require("./errors");

const app = express();
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

app.listen(process.env.PORT || 3333);
