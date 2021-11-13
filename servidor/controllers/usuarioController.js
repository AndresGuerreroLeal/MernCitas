//Model
const Usuario = require("../model/Usuario");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Crear nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    let usuario = await Usuario.findOne({ email: email });

    if (!email) {
      res.status(401).send({ msg: "Se requiren todos los datos" });
    }

    if (usuario) {
      res
        .status(401)
        .send({ msg: "Ya existe un usuario registrado con el email" });
    }

    usuario = new Usuario(req.body);

    const salt = await bcrypt.genSalt(8);
    usuario.password = await bcrypt.hash(password, salt);

    await usuario.save();

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

        res.status(200).send({ msg: "Registro exitoso", token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(401).send({ msg: "Hubo un error" });
  }
};
