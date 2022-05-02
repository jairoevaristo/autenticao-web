const { Router } = require("express");
const Product = require("./entities/Product");
const canAuth = require("./middlewares/canAuth");
const ProductRepository = require("./repository/ProdutcRepository");
const basicAuth = require("express-basic-auth");
const User = require("./entities/User");

const router = Router();

router.get("/", async (req, res) => {
  const productRepository = new ProductRepository();
  const produtos = await productRepository.getProducts();
  res.render("produtos", { produtos });
});

router.use(
  basicAuth({
    authorizer: canAuth,
    authorizeAsync: true,
    challenge: true,
  })
);

router.get("/produto-novo", async (req, res) => {
  const [_, hash] = req.headers.authorization.split(" ");
  const [name, password] = Buffer.from(hash, "base64")
    .toString("utf-8")
    .split(":");

  const userOn = await User.findOne({ name });

  return res.render("produto-form", { user: userOn });
});

router.post("/produto-save", async (req, res) => {
  const { nome, descricao, preco, categoria } = req.body;
  const productRepository = new ProductRepository();

  const [_, hash] = req.headers.authorization.split(" ");
  const [name, password] = Buffer.from(hash, "base64")
    .toString("utf-8")
    .split(":");

  const userOn = await User.findOne({ name });

  try {
    await productRepository.create(
      nome,
      Number(preco),
      descricao,
      categoria,
      userOn._id
    );

    return res.redirect("/produto");
  } catch (error) {
    console.log("err >>> " + error.message);
  }
});

router.get("/meus-produtos/", async (req, res) => {
  const [_, hash] = req.headers.authorization.split(" ");
  const [name, password] = Buffer.from(hash, "base64")
    .toString("utf-8")
    .split(":");

  const userOn = await User.findOne({ name });

  const produtos = await Product.find().where("autor").equals(userOn._id);
  return res.render("produtos-user", { produtos, user: userOn });
});

module.exports = router;
