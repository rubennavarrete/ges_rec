import { Router } from "express";
import { getPaciente, getPacientes } from "../controllers/pacientes.controller.js";


const router = Router();

router.get("/pacientes", getPacientes)
router.get("/pacientes/:cedula", getPaciente)
// router.post("/pacientes", createUsuario)
// router.put("/pacientes/:cedula",updateUsuario)
// router.delete("/pacientes/:cedula",deleteUsuario)

export default router;