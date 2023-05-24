import { Router } from "express";
import { getFarmacias, getFarmacia, createFarmacia, updateFarmacia, deleteFarmacias } from "../controllers/farmacias.controller.js";

const router = Router();

router.get("/farmacias", getFarmacias)
router.get("/farmacias/:RUC", getFarmacia)
router.post("/farmacias", createFarmacia)
router.put("/farmacias/:RUC",updateFarmacia)
router.delete("/farmacias/:RUC",deleteFarmacias)

export default router;