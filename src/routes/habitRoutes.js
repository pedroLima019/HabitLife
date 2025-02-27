import express from "express";
import { createHabit, deleteHabit, getHabits } from "../controllers/habitController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, createHabit);
router.delete("/:id", authenticateToken, deleteHabit)
router.get("/", authenticateToken, getHabits);

export default router;

