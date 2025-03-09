const express = require("express");
const router = express.Router();
const { getPrestamos, addPrestamo } = require("../../models/prestamos");

router.get("/", async (req, res) => {
    const prestamos = await getPrestamos();
    res.json(prestamos);
});

router.post("/", async (req, res) => {
    const { libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado } = req.body;
    const nuevoPrestamo = await addPrestamo(libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado);
    res.json(nuevoPrestamo);
});

module.exports = router;
// Eliminar un préstamo por ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM prestamos WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Préstamo no encontrado" });
        }
        res.json({ mensaje: "Préstamo eliminado correctamente", prestamo: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
