const express = require("express");
const router = express.Router();
const { getLectores, addLector } = require("../../models/lectores.js");

router.get("/", async (req, res) => {
    const lectores = await getLectores();
    res.json(lectores);
});

router.post("/", async (req, res) => {
    const { nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular } = req.body;
    const nuevoLector = await addLector(nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular);
    res.json(nuevoLector);
});

module.exports = router;
// Eliminar un lector por ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM lectores WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Lector no encontrado" });
        }
        res.json({ mensaje: "Lector eliminado correctamente", lector: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
