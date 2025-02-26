import express from "express";
import { register, login, userUpdate } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/userUpdate", authenticateToken, userUpdate);
export default router;
