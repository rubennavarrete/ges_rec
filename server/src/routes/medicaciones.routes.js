import { Router } from "express";
import { createMedicacion, getMedicaciones, getMedicacion, updateMedicacion, deleteMedicacion, getMedicacionByName, activarMedicacion } from "../controllers/medicaciones.controller.js";



const router = Router();

router.get("/medicaciones", getMedicaciones)
router.get("/medicaciones/:id_medicacion", getMedicacion)
router.get("/medicacion/busqueda",getMedicacionByName)
router.post("/medicaciones", createMedicacion)
router.put("/medicaciones/:id_medicacion",updateMedicacion)
router.put("/medicaciones/activar/:id_medicacion",activarMedicacion)
router.put("/medicaciones/desactivar/:id_medicacion",deleteMedicacion)

export default router;
