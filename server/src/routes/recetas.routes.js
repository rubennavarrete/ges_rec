import { Router } from "express";
import { createReceta, updateReceta, comprarReceta, getRecetas, getReceta, getRecetaCompleta, getRecetasPaciente, activarReceta, deleteReceta} from "../controllers/recetas.controller.js";


const router = Router();

router.get("/recetas", getRecetas)
router.get("/recetas/:id_usuario", getRecetasPaciente)
router.get("/recetaSearch/:id_receta", getReceta)
router.get("/receta/:id_receta", getRecetaCompleta)
router.post("/recetas", createReceta)
router.put("/recetas/:id_receta",updateReceta)
router.put("/recetas/ventas/:id_receta",comprarReceta)
router.put("/recetas/activar/:id_receta",activarReceta)
router.put("/recetas/desactivar/:id_receta",deleteReceta)
// router.delete("/recetas/:id_receta",deleteReceta)

export default router;
