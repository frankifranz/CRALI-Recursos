const express = require("express");
const router = express.Router();
const historialModel = require('../../models/historial');

router.get("/", async (req, res) => {
    const historial = await getHistorial();
    res.json(historial);
});

router.post("/", async (req, res) => {
    const { libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado } = req.body;
    const nuevoHistorial = await addHistorial(libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado);
    res.json(nuevoHistorial);
});

module.exports = router;
// Eliminar un registro de historial por ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM historial WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Registro de historial no encontrado" });
        }
        res.json({ mensaje: "Registro de historial eliminado correctamente", historial: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
