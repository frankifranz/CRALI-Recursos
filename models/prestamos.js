const { Pool } = require("../database/db");

const getPrestamos = async () => {
    const result = await Pool.query("SELECT * FROM prestamos");
    return result.rows;
};

const addPrestamo = async (libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado) => {
    const result = await Pool.query(
        "INSERT INTO prestamos (libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [libro_id, usuario_id, fecha_prestamo, fecha_devolucion, estado]
    );
    return result.rows[0];
};

module.exports = { getPrestamos, addPrestamo };
