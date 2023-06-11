import { Router } from "express";
import { ValidacionLogin } from "../controllers/login.controller.js";

const router = Router();


router.post("/login", ValidacionLogin )

export default router;