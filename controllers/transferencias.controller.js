
import { transferenciasModel } from "../models/transferencias.model.js"
const getAll = async (req, res) => {
    try {
        const transferencias = await transferenciasModel.getAll()
        return res.json(transferencias)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}
const transferenciaAgregar = async (req, res) => {
    try {
        const { emisor, receptor, monto } = req.body
        const nuevaTransferencia = { emisor, receptor, monto }
        const transferenciasDB = await transferenciasModel.agregar(nuevaTransferencia)
        return res.status(201).json(transferenciasDB)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const transferenciasController = {
    getAll, transferenciaAgregar
}