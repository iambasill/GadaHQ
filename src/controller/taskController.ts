import express, { Request, Response,  } from "express";
import { PrismaClient } from "../generated/prisma";
import { createTaskSchema } from "../schema/taskSchema";
import { BadRequestError } from "../httpClass/exceptions";
import { success } from "zod";
import sanitize from "sanitize-html";
import { sanitizeInput } from "../utils/helperFunction";

const prisma = new PrismaClient()


// ====================== CONTROLLERS ====================== //


export const createTask = async (req: Request, res: Response) => {
    const user:any = req.user; 
    const { title, description, status, priority, dueDate } = createTaskSchema.parse(req.body);

    let task = await prisma.task.findFirst({
        where: { title }
    });
    if (task) throw new BadRequestError( "Task with this title already exists");
    
    task = await prisma.task.create({
      data: { title, description, status, priority, dueDate, createBy: user.id },
    });

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task
    });

}

export const getAllTasks = async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    res.status(200).json({
        success: true,
        data: tasks
    });
}


export const getTaskById = async (req: Request, res: Response) => {
    const id  = sanitizeInput(req.params.id);
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new BadRequestError( "Task not found" );

    res.status(200).json({
        success: true,
        data: task
    });
};


export const updateTask = async (req: Request, res: Response) => {
    const id  = sanitizeInput(req.params.id);
    const { title, description, status, priority, dueDate } = req.body;
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new BadRequestError( "Task not found" );

    const updated = await prisma.task.update({
      where: { id },
      data: { title, description, status, priority, dueDate },
    });
    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updated
    });
};

export const deleteTask = async (req: Request, res: Response) => {
    const id  = sanitizeInput(req.params.id);
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new BadRequestError( "Task not found" );

    await prisma.task.delete({ where: { id } });
    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    });
}
