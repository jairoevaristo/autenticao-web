require("dotenv").config();
require("./database");

const express = require("express");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const User = require("./entities/User");
const Product = require("./entities/Product");
const { hash, compare } = require("bcryptjs");
const routes = require("./router");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser("keyboard cat"));
app.use(
  session({
    secret: "SecretStringForSession",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use("/produto", routes);

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static(__dirname + "../../public"));

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/cadastro", async (req, res) => {
  const { name, password, avatar } = req.body;

  const passwordHash = await hash(password, 8);
  const newUser = await User.create({ name, password: passwordHash, avatar });

  res.json(newUser);
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000/produto")
);
