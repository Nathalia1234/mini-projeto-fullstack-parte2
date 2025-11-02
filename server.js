import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDatabase } from "./src/database/connect.js";
import userRoutes from "./src/routes/user.routes.js";
import noteRoutes from "./src/routes/note.routes.js";

// -----------------------------
// Carrega as variáveis de ambiente (.env)
// -----------------------------
dotenv.config();


// -----------------------------
// Inicializa o app Express
// -----------------------------
const app = express();


// -----------------------------
// Middlewares globais
// -----------------------------
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-mongodb.vercel.app",
    "https://frontend-postgresql.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


// -----------------------------
// Conecta ao MongoDB Atlas
// -----------------------------
connectDatabase();

// -----------------------------
// Rotas principais
// -----------------------------
app.use("/api", userRoutes);
app.use("/api/notes", noteRoutes);

// -----------------------------
// Rota base — para teste local e vercel
// -----------------------------
app.get("/", (req, res) => {
  res.send("✅ API está rodando com sucesso!");
});

// -----------------------------
// Porta de execução
// -----------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

// -----------------------------
// Export do app — necessário pro Vercel
// -----------------------------
export default app;
