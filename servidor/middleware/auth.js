const Usuario = require("../model/Usuario");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).send({ msg: "Token invalido" });
  }
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado;
    next()
  } catch (error) {
    console.log(error);
    res.status(401).send({ msg: "No esta autorizado" });
  }
};

module.exports = auth;
