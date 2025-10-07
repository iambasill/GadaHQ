import express from "express";
import { authRoute } from "./authRouth";
import { taskRoute } from "./taskRoute";


export const rootRoute = express()


rootRoute.use('/api/auth',authRoute)
rootRoute.use('/api/tasks',taskRoute)


