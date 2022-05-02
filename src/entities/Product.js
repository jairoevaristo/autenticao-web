const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nome: String,
  categoria: String,
  preco: Number,
  descricao: String,
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
