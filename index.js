import express from "express";
import dotenv from "dotenv";

import connectToDatabase from"./src/mongoose/mongoose.database.js";
import taskRouter from "./src/routes/tasks.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/",taskRouter);
connectToDatabase();









app.listen(8000, () => console.log("servidor rodando na porta 8000"));
