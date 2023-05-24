import { Router } from "express";
import { createModulo, deleteModulos, getModulo, getModulos, updateModulo } from "../controllers/modulos.controller.js";



const router = Router();

router.get("/modulos", getModulos)
router.get("/modulos/:id_modulo", getModulo)
router.post("/modulos", createModulo)
router.put("/modulos/:id_modulo",updateModulo)
router.delete("/modulos/:id_modulo",deleteModulos)

export default router;