import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createHabit(req, res) {
  try {
    const { name, description, periodicity, recommendedTime, category } =
      req.body;

    if (!name || !periodicity || !recommendedTime || !category) {
      return res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const periodicityMap = {
      diário: "DAILY",
      semanal: "WEEKLY",
      mensal: "MONTHLY",
    };

    const formattedPeriodicity = periodicityMap[periodicity.toLowerCase()];

    if (!formattedPeriodicity) {
      return res.status(400).json({
        error:
          "Valor de periodicidade inválido. Valores aceitos: diário, semanal, mensal.",
      });
    }

    const recommendedDateTime = new Date();
    const [hours, minutes] = recommendedTime.split(":");
    recommendedDateTime.setUTCHours(
      parseInt(hours, 10),
      parseInt(minutes, 10),
      0,
      0
    );

    const newHabit = await prisma.habit.create({
      data: {
        name,
        description,
        periodicity: formattedPeriodicity,
        recommended_time: recommendedDateTime,
        category,
        user_id: req.user.userId,
      },
    });

    res.status(201).json(newHabit);
  } catch (error) {
    console.log("Erro ao criar hábito:", error);
    res.status(400).json({ error: error.message });
  }
}

export async function getHabits(req, res) {
  try {
    console.log("Buscando hábitos do usuário:", req.user.userId);

    const habits = await prisma.habit.findMany({
      where: { user_id: req.user.userId },
    });

    res.status(200).json(habits);
  } catch (error) {
    console.error("Erro ao buscar hábitos:", error);
    res.status(400).json({ error: error.message });
  }
}

export async function deleteHabit(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const habit = await prisma.habit.findUnique({ where: { id } });
    if (!habit || habit.userId !== userId) {
      return res.status(404).json({ error: "Hábito não encontrado" });
    }

    await prisma.habit.delete({ where: { id } });
    res.json({ message: "Hábito deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o hábito" });
  }
}
