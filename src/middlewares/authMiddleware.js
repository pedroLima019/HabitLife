import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Token recebido:", token);

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Usuário autenticado:", req.user);
    next();
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(403).json({ error: "Token inválido." });
  }
}
