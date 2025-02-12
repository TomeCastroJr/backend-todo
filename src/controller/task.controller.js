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

    async updateTask(){
        try {
            const taskId = this.req.params.id;
            const taskToUpdate = await TaskModel.findById(taskId);
    
            const allowedUpdates = ["isCompleted"];
            const requestUpdates = Object.keys(this.req.body);
    
            for(const update of requestUpdates){
                if(allowedUpdates.includes(update)){
                    taskToUpdate[update] = this.req.body[update];
                }else{
                    return this.res.status(500).send("problema na edição")
                }
            }
    
            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
            
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }

    async deleteTask(){
        const { id } = this.req.params

        const validatedId = mongoose.isValidObjectId(id);
        if(!validatedId){
            return this.deleteTaskres.status(400).send("Id inválido");
        }
    
        try{
            const taskdeleted =  await TaskModel.findByIdAndDelete(id);
            if(!taskdeleted){
                return this.res.status(400).send("tarefa não encontrada");
            }
            this.res.status(200).send("Tarefa deletada com sucesso")
        }catch(erro){
            this.res.status(500).send("Error ao deletar tarefa");
        }
    }
}

export default TaskController;