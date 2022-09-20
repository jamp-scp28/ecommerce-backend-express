import logger from "../utils/logger/logger";
import express from "express";
import {UserRegistration, sendMail} from "../utils/config/mailConfig";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import encryptPass from "../utils/config/encryptPass";
import { AuthDAO } from "../../database/auth.dao";
import {Types, Interfaces} from "../../types"
export class AuthController {
    private authDAO!: Interfaces.AuthDao;
    constructor(){
        this.authDAO = new AuthDAO();
    }

    public login = async (req: express.Request, res: express.Response)=>{
        const {email, password} = req.body;
        const response: Types.User | null | string = await this.authDAO.login(email, password);
        if(response && typeof response === 'object'){
            res.redirect('/home')
        }
        else {
            res.status(500).send({response: "Error login the user."})
        }
    }

    public register = async (req: express.Request, res: express.Response)=>{
        const user: Types.User = req.body;
        user.password = encryptPass(user.password!)
        const response = await this.authDAO.register(user);
        console.log("controoler data", response);
        res.status(200).send({userId: response});
    }
    
    public logout = (req: express.Request, res: express.Response) => {
        req.session.destroy( error => {
            if (error) {
                res.send({status: 'Logout Error', body: error})
            }
        })
        res.send('User logged out')
    }
}