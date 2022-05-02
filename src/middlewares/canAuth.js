const User = require("../entities/User");
const { compare } = require("bcryptjs");

module.exports = async (name, password, cb) => {
  if (!name || !password) {
    return res.send("Usuário ou senha inválidos");
  }

  const userExists = await User.findOne({ name });

  if (!userExists) {
    return cb(null, false);
  }

  const passwordUser = await compare(password, userExists.password);

  if (!passwordUser) {
    return cb(null, false);
  }

  return cb(null, true);
};
