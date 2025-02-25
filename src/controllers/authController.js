import { PrismaClient } from "@prisma/client";
import { registerUser, loginUser } from "../services/authService.js";

const prisma = new PrismaClient();

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email já está em uso." });
    }

    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
