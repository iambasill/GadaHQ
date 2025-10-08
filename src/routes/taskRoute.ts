import express from 'express'
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controller/taskController'
import { authMiddleware } from '../middlewares/authMiddleware'

export const taskRoute = express()

taskRoute.get('/',authMiddleware, getAllTasks) 
taskRoute.post('/', authMiddleware, createTask) 
taskRoute.get('/:id', authMiddleware, authMiddleware, getTaskById)
taskRoute.put('/:id',authMiddleware,  updateTask) 
taskRoute.delete('/:id', authMiddleware, deleteTask)


