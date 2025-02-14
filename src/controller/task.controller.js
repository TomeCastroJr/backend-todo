import TaskModel from "../models/task.model.js";
import mongoose from "mongoose";
import notFoundError from "../erros/mongodb.error.js";

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
            return notFoundError(this.res, "id");
        }
        try{
            const task = await TaskModel.findById(id).exec();
            if(!task){
                return notFoundError(this.res);
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
                    return notFoundError(this.res, "Não foi possível atualizar tarefa")
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
            return notFoundError(this.res, "id não é um objeto válido pelo mongodb");
        }
    
        try{
            const taskdeleted =  await TaskModel.findByIdAndDelete(id);
            if(!taskdeleted){
                return notFoundError(this.res, "Dado não encontrado no banco de dados")
            }
            this.res.status(200).send("Tarefa deletada com sucesso")
        }catch(erro){
            this.res.status(500).send("Error ao deletar tarefa");
        }
    }
}

export default TaskController;