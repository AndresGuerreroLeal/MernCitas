//Model
const Cita = require("../model/Cita");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.crearCita = async (req, res) => {
  const { paciente, sintomas, personal, fechaCita } = req.body;

  try {
    if (
      paciente.trim() === "" ||
      sintomas.trim() === "" ||
      personal.trim() === "" ||
      fechaCita === ""
    ) {
      res.status(500).send({ msg: "Información no valida" });
    }

    const cita = new Cita(req.body);

    cita.creador = req.usuario.id;

    await cita.save();

    res.json({ msg: "Registro de cita exitoso", cita });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error en el servidor" });
  }
};

exports.obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.find({ creador: req.usuario.id });

    console.log(citas);

    res.json({ citas });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error en el servidor" });
  }
};

exports.actualizarCita = async (req, res) => {
  const id = req.params.id;

  try {
    const cita = await Cita.findById(id);

    if (!cita) {
      res.status(400).send({ msg: "La cita no existe" });
    }

    if (cita.creador.toString() !== req.usuario.id) {
      res.status(400).send({ msg: "No esta autorizado" });
    }

    const nuevaCita = await Cita.findByIdAndUpdate(id, req.body, { new: true });

    await nuevaCita.save();

    res.json({ nuevaCita });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error en el servidor" });
  }
};

exports.eliminarCita = async (req, res) => {
  const id = req.params.id;

  try {
    const cita = await Cita.findById(id);

    console.log(cita)

    if (!cita) {
      res.status(400).send({ msg: "La cita no existe" });
    }

    if (cita.creador.toString() !== req.usuario.id) {
      res.status(400).send({ msg: "No esta autorizado" });
    }

    await Cita.findByIdAndDelete(id);


    res.json({msg:"Eliminado Correactamente"})
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error en el servidor" });
  }
};
