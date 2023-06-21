import { Router } from "express";
import { createUsuario, getUsuarios, getUsuario, updateUsuario, deleteUsuario } from "../controllers/usuarios.controller.js";
import { validateToken } from "../controllers/validate-token.js";

const router = Router();

router.get("/dashboard", getUsuarios)
router.get("/dashboard/:cedula", getUsuario)
router.post("/dashboard", createUsuario)
router.put("/usuarios/:cedula",updateUsuario)
router.delete("/usuarios/:cedula",deleteUsuario)

export default router;