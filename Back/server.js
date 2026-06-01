import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./Config/db.js";
import userRoutes from "./Routes/UserRoutes.js";
import bookRoutes from "./Routes/BookRoutes.js";
import loanRoutes from "./Routes/LoanRoutes.js";
import adminRoutes from "./Routes/AdminRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Biblioteca funcionando" });
});


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/loans", loanRoutes);
app.use("/admin", adminRoutes)

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.log("Erro ao iniciar o servidor:", error.message);
  }
};

startServer();