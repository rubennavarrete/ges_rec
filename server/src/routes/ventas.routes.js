import { Router } from "express";
import { getVentas } from "../controllers/ventas.controller.js";


const router = Router();

router.get("/ventas", getVentas)


export default router;