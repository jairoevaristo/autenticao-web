const mongoose = require("mongoose");

const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT } = process.env;

mongoose
  .connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`)
  .then(() => console.log("Banco de dados conectado com sucesso!"))
  .catch((err) =>
    console.log("Erro ao se conectar ao banco de dados >>> " + err.message)
  );

mongoose.Promise = global.Promise;
