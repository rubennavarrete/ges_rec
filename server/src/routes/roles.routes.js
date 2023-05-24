import { Router } from "express";
import { createRol, deleteRoles, getRol, getRoles, updateRol } from "../controllers/roles.controller.js";



const router = Router();

router.get("/roles", getRoles)
router.get("/roles/:id_rol", getRol)
router.post("/roles", createRol)
router.put("/roles/:id_rol",updateRol)
router.delete("/roles/:id_rol",deleteRoles)

export default router;