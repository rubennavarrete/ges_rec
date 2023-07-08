import { Router } from "express";
import { createMedicacion, getMedicaciones, getMedicacion, updateMedicacion, deleteMedicacion, getMedicacionByName } from "../controllers/medicaciones.controller.js";



const router = Router();

router.get("/medicaciones", getMedicaciones)
router.get("/medicaciones/:id", getMedicacion)
router.get("/medicacion/busqueda",getMedicacionByName)
router.post("/medicaciones", createMedicacion)
router.put("/medicaciones/:id",updateMedicacion)
router.delete("/medicaciones/:id",deleteMedicacion)

export default router;
