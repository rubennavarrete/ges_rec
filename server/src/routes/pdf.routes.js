import { Router } from "express";
import { getRecetaPaciente, pdfReceta,getMedicamentosPaciente } from "../controllers/pdf.controller.js";

const router = Router();

router.get("/pdf/:id_receta", pdfReceta);
router.get("/recetapdf/:id_receta", getRecetaPaciente);
router.get("/medicamentopdf/:id_receta", getMedicamentosPaciente);



export default router;