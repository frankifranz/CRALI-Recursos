const { pool } = require('../database/db');

const getHistorial = async () => {
    const result = await pool.query("SELECT * FROM historial");
    return result.rows;
};

const addHistorial = async (libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado) => {
    const result = await pool.query(
        "INSERT INTO historial (libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado]
    );
    return result.rows[0];
};

module.exports = { getHistorial, addHistorial };
