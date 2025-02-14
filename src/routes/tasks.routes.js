import { Router } from "express";
import mongoose from "mongoose";

import TaskController from "../controller/task.controller.js";

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
    return new TaskController(req, res).updateTask();
})

router.delete("/tasks/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask();
})

export default router;