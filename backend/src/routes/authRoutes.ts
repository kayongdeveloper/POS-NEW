import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js"; 

const router = Router();
const authController = new AuthController();


router.post("/login", authController.login);
router.get("/me", authenticateToken, authController.getMe);

export default router;
