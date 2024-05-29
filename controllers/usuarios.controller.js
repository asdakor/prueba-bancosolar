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
const usuarioEditar = async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await usuariosModel.buscarID(id)
        if (!usuario) return res.status(404).json({ ok: false, msg: "no se encontró el usuario" })
        const { nombre, balance } = req.body
        const datos = { id, nombre, balance }
        const usuariosEdit = await usuariosModel.edit(datos)
        return res.status(201).json(usuariosEdit)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}
const usuarioEliminar = async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await usuariosModel.buscarID(id)
        if (!usuario) return res.status(404).json({ ok: false, msg: "no se encontró el usuario" })
       
        await usuariosModel.eliminar(usuario.id);
        return res.status(200).json({ ok: true, msg: "Usuario eliminado correctamente" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const usuariosController = {
    getAll, usuarioAgregar, usuarioEditar, usuarioEliminar
}