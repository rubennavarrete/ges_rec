import { Router } from "express";
import { createUsuario, getUsuarios, getUsuario, updateUsuario, deleteUsuario } from "../controllers/usuarios.controller.js";
import { validateToken } from "../controllers/validate-token.js";

const router = Router();

router.get("/usuarios", validateToken, getUsuarios)
router.get("/usuarios/:cedula", getUsuario)
router.post("/usuarios", createUsuario)
router.put("/usuarios/:cedula",updateUsuario)
router.delete("/usuarios/:cedula",deleteUsuario)

export default router;