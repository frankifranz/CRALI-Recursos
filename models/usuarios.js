const { Pool } = require("../database/db");

const getUsuarios = async () => {
    const result = await Pool.query("SELECT * FROM usuarios");
    return result.rows;
};

const addUsuario = async (usuario, contraseña, rol) => {
    const result = await Pool.query(
        "INSERT INTO usuarios (usuario, contraseña, rol) VALUES ($1, $2, $3) RETURNING *",
        [usuario, contraseña, rol]
    );
    return result.rows[0];
};

module.exports = { getUsuarios, addUsuario };
