const express = require("express");

const router = express.Router();

const citasController = require("../controllers/citaController");
const auth = require("../middleware/auth");

//Crear Cita
router.post("/", auth, citasController.crearCita);

//Obtener citas
router.get("/", auth, citasController.obtenerCitas);

//Modificar Cita
router.put("/:id", auth, citasController.actualizarCita);

//Eliminar cita
router.delete("/:id", auth, citasController.eliminarCita);

module.exports = router;
