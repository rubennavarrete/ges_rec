import { Router } from "express";
import { createOperacion, deleteOperacion, getOperacion, getOperaciones, updateOperacion } from "../controllers/operaciones.controller.js";



const router = Router();

router.get("/operaciones", getOperaciones)
router.get("/operaciones/:id_operacion", getOperacion)
router.post("/operaciones", createOperacion)
router.put("/operaciones/:id_operacion",updateOperacion)
router.delete("/operaciones/:id_operacion",deleteOperacion)

export default router;