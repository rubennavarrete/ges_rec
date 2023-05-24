import { Router } from "express";
import { createReceta_com, deleteRecetas_com, getReceta_com, getRecetas_com, updateReceta_com } from "../controllers/recetas_com.controller.js";



const router = Router();

router.get("/recetas_com", getRecetas_com)
router.get("/recetas_com/:id_receta_com", getReceta_com)
router.post("/recetas_com", createReceta_com)
router.put("/recetas_com/:id_receta_com",updateReceta_com)
router.delete("/recetas_com/:id_receta_com",deleteRecetas_com)

export default router;