const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const auth = require("../middleware/auth")


//Autenticar al usuario
router.post("/", authController.autenticarUsuario);

//Obtener usuario autenticado
router.get("/",auth, authController.usuarioAutenticado);


module.exports = router;
