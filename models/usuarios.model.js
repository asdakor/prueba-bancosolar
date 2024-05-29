import { pool } from "../database/connection.js";

const getAll = async () => {
    const query = {
        text: 'SELECT * FROM usuarios',
        values: []
    }
    const { rows } = await pool.query(query)
    return rows
}

const agregar = async ({ nombre, balance}) => {
    const query = {
        text: "INSERT INTO usuarios (nombre, balance) values ($1, $2) RETURNING *",
        values: [nombre, balance]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

export const usuariosModel = {
    getAll, agregar
}