import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

app.get("/tasks/:id", async (req, res) => {
    const { id } = req.params
    const validatedId = mongoose.isValidObjectId(id);
    if(!validatedId){
        return res.status(400).send("Id inválido");
    }
    try{
        const task = await TaskModel.findById(id).exec();
        if(!task){
            return res.status(404).send("Tarefa não encontrada")
        }
        res.status(200).send(task)
    }catch(error){
        res.status(500).send("Erro ao consultar tarefa")
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

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params

    const validatedId = mongoose.isValidObjectId(id);
    if(!validatedId){
        return res.status(400).send("Id inválido");
    }

    try{
        const taskdeleted =  await TaskModel.findByIdAndDelete(id);
        if(!taskdeleted){
            return res.status(400).send("tarefa não encontrada");
        }
        res.status(200).send("Tarefa deletada com sucesso")
    }catch(erro){
        res.status(500).send("Error ao deletar tarefa");
    }

})






app.listen(8000, () => console.log("servidor rodando na porta 8000"));
