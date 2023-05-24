import { Router } from "express";
import { createPermiso, deletePermisos, getPermiso, getPermisos, updatePermiso } from "../controllers/permisos.controller.js";



const router = Router();

router.get("/permisos", getPermisos)
router.get("/permisos/:id_permiso", getPermiso)
router.post("/permisos", createPermiso)
router.put("/permisos/:id_permiso",updatePermiso)
router.delete("/permisos/:id_permiso",deletePermisos)

export default router;