import TaskModel from "../models/task.model.js";
import mongoose from "mongoose";

class TaskController {
    constructor(req, res){
        this.req = req;
        this.res = res
    }

    async getTasks(){
        try{
            const tasks = await TaskModel.find({})
            this.res.status(200).send(tasks);
    
        }catch(error){
            res.status(500).send(error.message)
        }
    }

    async getTaskById(){
        const { id } = this.req.params
        const validatedId = mongoose.isValidObjectId(id);
        if(!validatedId){
            return this.res.status(400).send("Id inválido");
        }
        try{
            const task = await TaskModel.findById(id).exec();
            if(!task){
                return this.res.status(404).send("Tarefa não encontrada")
            }
            this.res.status(200).send(task)
        }catch(error){
            this.res.status(500).send("Erro ao consultar tarefa")
        }
    }

    async createTask(){
        try{
            const newTask = new TaskModel(this.req.body)
            await newTask.save();
            this.res.status(201).send(newTask);
        }catch(error){
            this.res.status(500).send(error.message);
        }
    }
}

export default TaskController;