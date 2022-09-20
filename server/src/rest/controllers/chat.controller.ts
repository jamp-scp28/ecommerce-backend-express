import logger from "../utils/logger/logger";
import express from "express";
import { Types, Interfaces} from "../../types"
import { chatDao } from "../../database/chat.dao";

export class ChatController { 
    
    private chatDAO!: Interfaces.ChatDAO; 

    constructor(){
        this.chatDAO = new chatDao();
    }
    
    public getChats = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /messages');
        const response: Types.ChatDTO[] = await this.chatDAO.getChats(); 
        res.status(200).json(response)
    }

    public getChatByEmail = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /chat/:email')
        const email: string = req.params.email
        const response: Types.ChatDTO = await this.chatDAO.getChatByEmail(email); 
        res.json(response)
    }

    public createChat = async (req: express.Request, res: express.Response)=>{
        logger.info('POST /createChat');
        const user: any = req.user;

        if (user && user.role === "admin"){
            const response: number | string = await this.chatDAO.createChat(req.body);
            res.status(200).json(response)
        }
        else {
            res.status(401).send('Error creating the product.')
        }
    }

    public updateChat = async (req: express.Request, res: express.Response)=>{
        logger.info('PUT /updateChat');
        const id = parseInt(req.params.id);
        const chat = req.body;
        const response = await this.chatDAO.updateChat(id, chat); 
        res.send({response})
    }

    public deleteChat = async (req: express.Request, res: express.Response)=>{
        logger.info('DELETE /deleteChat')
        const user: any = req.user
        const email = req.params.email
        const response = await this.chatDAO.deleteChat(email)
        res.send({response})
    }
    
}