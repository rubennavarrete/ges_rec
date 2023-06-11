import { Router } from "express";
import { deletePerfil, getPerfil, getPerfiles } from "../controllers/perfiles.controller.js";



const router = Router();

router.get("/perfiles", getPerfiles)
router.get("/perfiles/:id_perfil", getPerfil)
// router.post("/perfiles", createRol)
// router.put("/perfiles/:id_rol",updateRol)
router.delete("/perfiles/:id_perfil",deletePerfil)

export default router;