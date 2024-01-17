import { Router } from "express";
import { pdfReceta } from "../controllers/pdf.controller.js";

const router = Router();

router.get("/pdf/:id_receta", pdfReceta);




export default router;