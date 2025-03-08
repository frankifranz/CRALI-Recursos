require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Sirve archivos HTML desde "public"

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
