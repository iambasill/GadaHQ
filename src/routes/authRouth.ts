import express from 'express'
import { loginController, registerController} from '../controller/authController'

export const authRoute = express()


authRoute.post('/login',loginController)
authRoute.post('/signup',registerController)

