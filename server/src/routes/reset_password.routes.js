import { Router } from "express";
import { ResetPassword, ChangePassword } from "../controllers/reset_password.controller.js";    

const router = Router();


router.post("/reset_password", ResetPassword ),
router.put("/reset_password/:token", ChangePassword )

export default router;



