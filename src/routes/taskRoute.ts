import express from 'express'
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controller/taskController'

export const taskRoute = express()

taskRoute.get('/', getAllTasks) 
taskRoute.post('/', createTask) 
taskRoute.get('/:id', getTaskById)
taskRoute.put('/:id', updateTask) 
taskRoute.delete('/:id', deleteTask) 
