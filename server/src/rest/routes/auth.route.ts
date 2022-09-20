import { Router } from "express"
import {AuthController} from "../controllers/auth.controller"

const authController = new AuthController()
const auth = Router();

auth.post('/login', authController.login)
auth.post('/register', authController.register)
auth.get('/logout', authController.logout)

export default auth