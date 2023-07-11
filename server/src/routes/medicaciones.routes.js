import { Router } from "express";
import { createMedicacion, getMedicaciones, getMedicacion, updateMedicacion, deleteMedicacion, getMedicacionByName } from "../controllers/medicaciones.controller.js";



const router = Router();

router.get("/medicaciones", getMedicaciones)
router.get("/medicaciones/:id_medicacion", getMedicacion)
router.get("/medicacion/busqueda",getMedicacionByName)
router.post("/medicaciones", createMedicacion)
router.put("/medicaciones/:id_medicacion",updateMedicacion)
router.delete("/medicaciones/:id_medicacion",deleteMedicacion)

export default router;
