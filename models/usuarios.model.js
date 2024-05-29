import { pool } from "../database/connection.js";

const getAll = async () => {
    const query = {
        text: 'SELECT * FROM usuarios',
        values: []
    }
    const { rows } = await pool.query(query)
    return rows
}
const buscarID = async (id) => {
    const query = {
        text: "SELECT * FROM usuarios WHERE id = $1",
        values: [id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const agregar = async ({ nombre, balance}) => {
    const query = {
        text: "INSERT INTO usuarios (nombre, balance) values ($1, $2) RETURNING *",
        values: [nombre, balance]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}
const edit = async ({ id, nombre, balance }) => {
    const query = {
        text: "UPDATE usuarios SET nombre = $2, balance = $3 WHERE id = $1",
        values: [id, nombre, balance ]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}
export const usuariosModel = {
    getAll, agregar, edit, buscarID
}