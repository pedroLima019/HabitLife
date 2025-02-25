import express from "express";
import { createHabit, getHabits } from "../controllers/habitController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, createHabit);
router.get("/", authenticateToken, getHabits);

export default router;

