import { Router } from "express";
import { createReceta_med, deleteRecetas_med, getReceta_med, getRecetas_med, updateReceta_med } from "../controllers/recetas_med.controller.js";



const router = Router();

router.get("/recetas_med", getRecetas_med)
router.get("/recetas_med/:id_receta_med", getReceta_med)
router.post("/recetas_med", createReceta_med)
router.put("/recetas_med/:id_receta_med",updateReceta_med)
router.delete("/recetas_med/:id_receta_med",deleteRecetas_med)

export default router;