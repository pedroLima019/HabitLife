import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function registerUser(name, email, password) {

  if (!email || !password || !name) {
    throw new Error("Todos os campos são obrigatórios");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email já em uso");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
}

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Credenciais inválidas.");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
}
