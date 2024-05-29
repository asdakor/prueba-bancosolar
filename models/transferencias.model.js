import { text } from "express";
import { pool } from "../database/connection.js";

const getAll = async () => {
    const query = {
        text: 'SELECT * FROM transferencias',
        values: []
    }
    const { rows } = await pool.query(query)
    return rows
}
const agregar = async ({ emisor, receptor, monto }) => {
    const query = {
        text: "INSERT INTO transferencias (emisor, receptor, monto ) values ($1, $2, $3) RETURNING *",
        values: [emisor, receptor, monto]
    }
    const { rows } = await pool.query(query)

    //adicional logica cambio de balance
    const queryEmisor = {
        text: "UPDATE usuarios SET balance = balance - $2 WHERE id = $1",
        values: [emisor,monto]
    }
    await pool.query(queryEmisor)
    const queryReceptor = {
        text: "UPDATE usuarios SET balance = balance + $2 WHERE id = $1",
        values: [receptor,monto]
    }
    await pool.query(queryReceptor)
    return rows[0]
}
export const transferenciasModel = {
    getAll, agregar
}