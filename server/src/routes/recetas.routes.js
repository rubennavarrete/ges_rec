import { Router } from "express";
import { createReceta, deleteRecetas, getReceta, getRecetas, updateReceta } from "../controllers/recetas.controller.js";



const router = Router();

router.get("/recetas", getRecetas)
router.get("/recetas/:id_receta", getReceta)
router.post("/recetas", createReceta)
router.put("/recetas/:id_receta",updateReceta)
router.delete("/recetas/:id_receta",deleteRecetas)

export default router;