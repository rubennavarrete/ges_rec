import { Router } from "express";
import { createPaciente, deletePacientes, getPaciente, getPacientes, updatePaciente } from "../controllers/pacientes.controller.js";



const router = Router();

router.get("/pacientes", getPacientes)
router.get("/pacientes/:id_paciente", getPaciente)
router.post("/pacientes", createPaciente)
router.put("/pacientes/:id_paciente",updatePaciente)
router.delete("/pacientes/:id_paciente",deletePacientes)

export default router;