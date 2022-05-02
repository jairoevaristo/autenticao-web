const Product = require("../entities/Product");

class ProductRepository {
  async create(nome, preco, descricao, categoria, id_user) {
    const newProduct = await Product.create({
      nome,
      preco,
      descricao,
      categoria,
      autor: id_user,
    });

    return newProduct;
  }

  async getProducts() {
    const products = await Product.find().populate("autor");
    return products;
  }
}

module.exports = ProductRepository;
