import express from "express";
import dotenv from "dotenv";
import cadastroRoutes from "./src/routes/cadastroRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("🪄 Servidor funcionando...");
});

app.use("/cadastro", cadastroRoutes);

app.listen(serverPort, () => {
    console.log(`🧙 Servidor rodando em http://localhost:${serverPort}`);
});