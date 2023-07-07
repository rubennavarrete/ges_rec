import { Router } from "express";
import { createMedicacion, getMedicaciones, getMedicacion, updateMedicacion, deleteMedicacion } from "../controllers/medicaciones.controller.js";



const router = Router();

router.get("/medicaciones", getMedicaciones)
router.get("/medicaciones/:id", getMedicacion)
router.post("/medicaciones", createMedicacion)
router.put("/medicaciones/:id",updateMedicacion)
router.delete("/medicaciones/:id",deleteMedicacion)

export default router;
