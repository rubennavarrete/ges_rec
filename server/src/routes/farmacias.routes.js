import { Router } from "express";
import { createFarmacia, getFarmacias, getFarmacia, updateFarmacia, deleteFarmacia } from "../controllers/farmacias.controller.js";

import verificarToken from "../../middleware/auth-middleware.js"

const router = Router();

//router.use(verificarToken);
router.get("/farmacias", getFarmacias)
router.get("/farmacias/:ruc", getFarmacia)
router.post("/farmacias", createFarmacia)
router.put("/farmacias/:ruc",updateFarmacia)
router.delete("/farmacias/:ruc",deleteFarmacia)

export default router;