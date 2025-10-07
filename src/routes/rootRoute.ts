import express from "express";
import { authRoute } from "./authRouth";
import { taskRoute } from "./taskRoute";


export const rootRoute = express()

rootRoute.get('/', (req, res) => {
    res.json({ 
        success: true,
        message : "API is working fine... Check Documentation at /api-docs" });
});
rootRoute.use('/api/auth',authRoute)
rootRoute.use('/api/task',taskRoute)


