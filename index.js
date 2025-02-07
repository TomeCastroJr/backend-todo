import express from "express";
import dotenv from "dotenv";

import connectToDatabase from"./src/mongoose/mongoose.database.js"

dotenv.config();
const app = express();

connectToDatabase();

app.get('/', (req, res) => {
    res.status(200).send("Hello word");
})

app.listen(8000, () => console.log("servidor rodando na porta 8000"));
