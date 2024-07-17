import { Router } from "express";
import { getVentaByCode, getVentas } from "../controllers/ventas.controller.js";


const router = Router();

router.get("/ventas", getVentas);
router.get("/ventas/:codigo", getVentaByCode);


export default router;