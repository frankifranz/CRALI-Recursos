const pool = require('../database/db');

const getLibros = async () => {
    const result = await pool.query("SELECT * FROM libros");
    return result.rows;
};

const addLibro = async (titulo, autor, año, area, signatura_topografica, ejemplares, estado, pdf) => {
    const result = await pool.query(
        "INSERT INTO libros (titulo, autor, año, area, signatura_topografica, ejemplares, estado, pdf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [titulo, autor, año, area, signatura_topografica, ejemplares, estado, pdf]
    );
    return result.rows[0];
};

module.exports = { getLibros, addLibro };
