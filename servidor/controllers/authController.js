//Model
const Usuario = require("../model/Usuario");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.autenticarUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).send({ msg: "Información invalida" });
    }

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrecta) {
      res.status(404).send({ msg: "No autorizado" });
    }

    const payload = {
      id: usuario.id,
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 6000,
      },
      (error, token) => {
        if (error) throw error;

        res.status(200).send({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(401).send({ msg: "Hubo un error" });
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");

    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(401).send({ msg: "Hubo un error" });
  }
};
