import express from "express";
import {
  register,
  login,
  userUpdate,
  deleteUser,
} from "../controllers/authController.js";

import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/userUpdate", authenticateToken, userUpdate);
router.delete("/deleteAccount", authenticateToken, deleteUser);

export default router;
