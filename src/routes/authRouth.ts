import express from 'express'
import { loginController, registerController} from '../controller/authController'

export const authRoute = express()

authRoute.get('/',()=>{
    return "API is working fine... Check Documentation at /api-docs"
})
authRoute.post('/login',loginController)
authRoute.post('/signup',registerController)

