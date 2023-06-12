import { Router } from "express";
import { getMedico, getMedicos } from "../controllers/medicos.controller.js";


const router = Router();

router.get("/medicos", getMedicos)
router.get("/medicos/:cedula", getMedico)
// router.post("/pacientes", createUsuario)
// router.put("/pacientes/:cedula",updateUsuario)
// router.delete("/pacientes/:cedula",deleteUsuario)

export default router;