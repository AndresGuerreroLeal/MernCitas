const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

//Función conectar base de datos
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
    });

    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectarDB;
