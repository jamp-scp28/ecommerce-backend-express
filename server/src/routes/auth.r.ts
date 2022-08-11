import { Router } from "express";
import {
    loginController,
    registerController,
    logoutController
} from "../controllers/auth.c";

const auth = Router();

auth.post('/login', loginController);

auth.post('/register', registerController);

auth.get('/logout', logoutController)

export default auth;