import { Router } from "express";
import { createFarmacia, getFarmacias, getFarmacia, updateFarmacia, deleteFarmacia, activarFarmacia } from "../controllers/farmacias.controller.js";

const router = Router();


router.get("/farmacias", getFarmacias)
router.get("/farmacias/:ruc", getFarmacia)
router.post("/farmacias", createFarmacia)
router.put("/farmacias/:ruc",updateFarmacia)
router.put("/farmacias/desactivar/:ruc",deleteFarmacia)
router.put("/farmacias/activar/:ruc",activarFarmacia)

export default router;