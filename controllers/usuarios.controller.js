import { usuariosModel } from "../models/usuarios.model.js"
const getAll = async (req, res) => {
    try {
        const usuarios = await usuariosModel.getAll()
        return res.json(usuarios)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const usuarioAgregar = async (req, res) => {
    try {
        const { nombre, balance } = req.body
        const nuevoUsuario = { nombre, balance }
        const usuariosDB = await usuariosModel.agregar(nuevoUsuario)
        return res.status(201).json(usuariosDB)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const usuariosController = {
    getAll, usuarioAgregar
}