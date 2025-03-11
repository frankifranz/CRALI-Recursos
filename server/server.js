require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const librosRoutes = require("./routes/libros");
const usuariosRoutes = require("./routes/usuarios");
const lectoresRoutes = require("./routes/lectores");
const prestamosRoutes = require("./routes/prestamos");
const historialRoutes = require("./routes/historial");

// Definir rutas
app.use("/api/libros", librosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/lectores", lectoresRoutes);
app.use("/api/prestamos", prestamosRoutes);
app.use("/api/historial", historialRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("📚 Servidor funcionando correctamente 🚀");
});
const path = require("path");

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
