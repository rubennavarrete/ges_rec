import { Router } from "express";
import { createUsuario, getUsuarios, getUsuario, updateUsuario, deleteUsuarios } from "../controllers/usuarios.controller.js";


const router = Router();

router.get("/usuarios", getUsuarios)
router.get("/usuarios/:cedula", getUsuario)
router.post("/usuarios", createUsuario)
router.put("/usuarios/:cedula",updateUsuario)
router.delete("/usuarios/:cedula",deleteUsuarios)
export default router;