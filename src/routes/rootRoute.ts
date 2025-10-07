import express from "express";
import { authRoute } from "./authRouth";
import { taskRoute } from "./taskRoute";


export const rootRoute = express()

rootRoute.get('/', (req, res) => {
  res.send(`
    <h2>API is working fine ✅</h2>
    <p>Check documentation here:
      <a href="https://github.com/iambasill/GadaHQ/blob/main/README.md#api-endpoints" target="_blank">
        API Documentation
      </a>
    </p>
  `);
});
rootRoute.use('/api/auth',authRoute)
rootRoute.use('/api/task',taskRoute)


