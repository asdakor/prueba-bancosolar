import { Router } from "express";
const router = Router()

import { webController } from "../controllers/web.controller.js";
import { usuariosController } from "../controllers/usuarios.controller.js";

router.get('/', webController.inicio)
router.get('/usuarios', usuariosController.getAll)
router.post('/usuario', usuariosController.usuarioAgregar)
router.put('/usuario/:id', usuariosController.usuarioEditar)

export default router;