const express = require("express");
const router = express.Router();
const { getLibros, addLibro } = require("../../models/libros");

router.get("/", async (req, res) => {
    const libros = await getLibros();
    res.json(libros);
});

router.post("/", async (req, res) => {
    const { titulo, autor, año, area, signatura_topografica, ejemplares, estado, pdf } = req.body;
    const nuevoLibro = await addLibro(titulo, autor, año, area, signatura_topografica, ejemplares, estado, pdf);
    res.json(nuevoLibro);
});

module.exports = router;
// Eliminar un libro por ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM libros WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }
        res.json({ mensaje: "Libro eliminado correctamente", libro: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
