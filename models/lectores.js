const db = require('../database/db');

const getLectores = async () => {
    const result = await pool.query("SELECT * FROM lectores");
    return result.rows;
};

const addLector = async (nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular) => {
    const result = await pool.query(
        "INSERT INTO lectores (nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [nombres_completos, cedula_identidad, registro_universitario, direccion, numero_celular]
    );
    return result.rows[0];
};

module.exports = { getLectores, addLector };
