const mongoose = require("mongoose");

const CitaSchema = mongoose.Schema({
  paciente: {
    type: String,
    trim: true,
    require: true,
  },
  sintomas: {
    type: String,
    trim: true,
    require: true,
  },
  personal: {
    type: String,
    trim: true,
    require: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  fechaCita: {
    type: Date,
    require: true,
  },
  fechaActual: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Cita", CitaSchema);
