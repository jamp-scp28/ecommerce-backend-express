import express from "express";
import {UserRegistration, sendMail} from "../utils/config/mailConfig";
import encryptPass from "../utils/config/encryptPass";
import { AuthDAO } from "../../database/auth.dao";
import {Types, Interfaces} from "../../types"

export class AuthController {
    private authDAO!: Interfaces.AuthDao;
    constructor(){
        this.authDAO = new AuthDAO();
    }

    /**
   * @openapi
   * /api/v1/auth/login:
   *   post:
   *     tags: [Auth]
   *     description: Login
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:          
   *                type: string
   *              password:    
   *                type: string  
   *     responses:
   *       200:
   *         description: Session token
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *       500:
   *         $ref: '#/components/responses/500'
   */ 
    public login = async (req: express.Request, res: express.Response)=>{
        const {email, password} = req.body;
        const response: Types.User | null | string = await this.authDAO.login(email, password);
        if(response && typeof response === 'object'){
            res.status(200).json(response)
        }
        else {
            res.status(500).send({response: "Error login the user."})
        }
    }

    /**
   * @openapi
   * /api/v1/auth/register:
   *   post:
   *     tags: [Auth]
   *     description: register new user
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              username:          
   *                type: string
   *              email:    
   *                type: string  
   *              password:    
   *                type: string
   *              address:    
   *                type: string
   *              age:    
   *                type: number
   *              phone_number_prefix:    
   *                type: string
   *              phone_number:
   *                type: number 
   *              avatar:
   *                type: string
   *     responses:
   *       200:
   *         description: Session token
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *       500:
   *         $ref: '#/components/responses/500'
   */ 
    public register = async (req: express.Request, res: express.Response)=>{
        const user: Types.User = req.body;
        user.password = encryptPass(user.password!)
        const newUserId = await this.authDAO.register(user);

        if(newUserId === 0){
            res.status(500).send({Error: 'User Already Registered.'});
        }else{
            sendMail(UserRegistration(user))
            res.status(200).send({userId: newUserId});
        }
    }

    public logout = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        })
    }
}