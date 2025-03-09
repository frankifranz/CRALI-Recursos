const express = require("express");
const router = express.Router();
const { getUsuarios, addUsuario } = require("../../models/usuarios");

router.get("/", async (req, res) => {
    const usuarios = await getUsuarios();
    res.json(usuarios);
});

router.post("/", async (req, res) => {
    const { usuario, contraseña, rol } = req.body;
    const nuevoUsuario = await addUsuario(usuario, contraseña, rol);
    res.json(nuevoUsuario);
});

module.exports = router;
// Eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario eliminado correctamente", usuario: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
