import express from "express";
import listEndPoints from "express-list-endpoints";
import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/habits", habitRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  // console.log(listEndPoints(app));
});
