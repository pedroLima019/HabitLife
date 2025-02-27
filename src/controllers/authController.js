import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
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

export async function userUpdate(req, res) {
  console.log("Dados do usuário autenticado:", req.user);
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { userId } = req.user;
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (email && email !== user.email) {
      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: "E-mail já está em uso" });
      }
    }

    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword,
      },
    });

    res.json({ message: "Usuário atualizado com sucesso", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.user;

    await prisma.habit.deleteMany({ where: { userId } }); // Deletar hábitos do usuário
    await prisma.user.delete({ where: { id: userId } });

    res.json({ message: "Conta deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar a conta." });
  }
}
