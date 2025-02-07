import express from "express";
import dotenv from "dotenv";

import connectToDatabase from"./src/mongoose/mongoose.database.js";
import TaskModel from "./src/models/task.model.js";

dotenv.config();
const app = express();

app.use(express.json());
connectToDatabase();

app.get('/tasks', async (req, res) => {
    try{
        const tasks = await TaskModel.find({})
        res.status(200).send(tasks);

    }catch(error){
        res.status(500).send(error.message)
    }
})

app.post("/tasks", async (req, res) => {
    try{
        const newTask = new TaskModel(req.body)
        await newTask.save();
        res.status(201).send(newTask);
    }catch(error){
        res.status(500).send(error.message);
    }
})

app.listen(8000, () => console.log("servidor rodando na porta 8000"));
