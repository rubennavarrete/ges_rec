import { Router } from "express";
import { createMedicacion, deleteMedicaciones, getMedicacion, getMedicaciones, updateMedicacion } from "../controllers/medicaciones.controller.js";



const router = Router();

router.get("/medicaciones", getMedicaciones)
router.get("/medicaciones/:id", getMedicacion)
router.post("/medicaciones", createMedicacion)
router.put("/medicaciones/:id",updateMedicacion)
router.delete("/medicaciones/:id",deleteMedicaciones)

export default router;