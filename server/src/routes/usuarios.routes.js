import { Router } from "express";
import { createUsuario, getMedicos, getPacientes, getUsuario, updateUsuario, deleteUsuario, activarUsuario } from "../controllers/usuarios.controller.js";


const router = Router();


router.get("/medicos", getMedicos)
router.get("/pacientes", getPacientes)
router.get("/usuarios/:cedula", getUsuario)
router.post("/usuarios", createUsuario)
router.put("/usuarios/:cedula",updateUsuario)
router.put("/usuarios/desactivar/:cedula",deleteUsuario)
router.put("/usuarios/activar/:cedula",activarUsuario)

export default router;