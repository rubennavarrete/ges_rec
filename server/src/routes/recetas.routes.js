import { Router } from "express";
import { createReceta, getRecetas,getRecetaCompleta, pdfReceta, getRecetasPaciente} from "../controllers/recetas.controller.js";


const router = Router();

router.get("/recetas", getRecetas)
router.get("/recetas/:id_usuario", getRecetasPaciente)
router.get("/receta/:id_receta", getRecetaCompleta)
router.post("/recetas", createReceta)
router.get("/recetas/:id_receta", pdfReceta)
// router.put("/recetas/:id_receta",updateReceta)
// router.delete("/recetas/:id_receta",deleteReceta)

export default router;
