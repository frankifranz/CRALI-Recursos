const express = require("express");
const router = express.Router();
const pool = require("../database/db"); // Importar conexión a la base de datos

// Ruta para obtener todos los lectores
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM lectores");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener lectores" });
    }
});

// Ruta para obtener un lector por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM lectores WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lector no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener lector" });
    }
});

// Ruta para agregar un nuevo lector
router.post("/", async (req, res) => {
    try {
        const { nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular } = req.body;

        const result = await pool.query(
            "INSERT INTO lectores (nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar lector" });
    }
});

// Ruta para actualizar un lector por ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular } = req.body;

        const result = await pool.query(
            "UPDATE lectores SET nombres_completos = $1, cedula_identidad = $2, registro_universitario = $3, direccion = $4, numero_celular = $5 WHERE id = $6 RETURNING *",
            [nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lector no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar lector" });
    }
});

// Ruta para eliminar un lector por ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM lectores WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lector no encontrado" });
        }

        res.json({ message: "Lector eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar lector" });
    }
});

module.exports = router;
