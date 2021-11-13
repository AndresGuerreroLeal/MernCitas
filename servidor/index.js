const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

//Configuraciones
const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

//Base de datos
conectarDB();

//Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/citas", require("./routes/citas"));


//Puerto
const PORT = process.env.PORT || 4002;

//Ejecución
app.listen(PORT, () => {
  console.log(`El servidor funciona en el puerto ${PORT}`);
});
