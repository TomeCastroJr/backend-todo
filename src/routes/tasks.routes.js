import { Router } from "express";
import mongoose from "mongoose";

import TaskController from "../controller/task.controller.js";
import TaskModel from"../models/task.model.js";

const router = Router();

router.get('/tasks', async (req, res) => {
    return new TaskController(req, res).getTasks();
})

router.get("/tasks/:id", async (req, res) => {
    return new TaskController(req, res).getTaskById();
})

router.post("/tasks", async (req, res) => {
    return new TaskController(req, res).createTask();
})

router.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskToUpdate = await TaskModel.findById(taskId);

        const allowedUpdates = ["isCompleted"];
        const requestUpdates = Object.keys(req.body);

        for(const update of requestUpdates){
            if(allowedUpdates.includes(update)){
                taskToUpdate[update] = req.body[update];
            }else{
                return res.status(500).send("problema na edição")
            }
        }

        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

router.delete("/tasks/:id", async (req, res) => {
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

export default router;