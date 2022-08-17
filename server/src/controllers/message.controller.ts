import logger from "../utils/logger";
import express from "express";
import { messageDTO } from "../database/models/message.dto";
import DatabaseFactory from "../database/db.factory";

const messageDAO: any = DatabaseFactory("message");

export const getMessagesController = async (req: express.Request, res: express.Response)=>{
    logger.info('GET /messages');
    const response: messageDTO[] = await messageDAO.getMessages(); 
    res.json(response)
}

export const getMessageByIdController = async (req: express.Request, res: express.Response)=>{
    logger.info('GET /messages/:id');
    const id = parseInt(req.params.id);
    const response: messageDTO = await messageDAO.getMessageById(id); 
    res.json(response)
}

export const createMessageController = async (req: express.Request, res: express.Response)=>{
    logger.info('POST /createMessage');
    const user: any = req.user;
    const {message_name, description, code, stock, price, photo} = req.body;

    if (user && user.role === "admin"){
        const response: string = await messageDAO.createMessage(message_name, description, code, price, photo, stock);
        res.status(200).json(response)
    }
    else {
        res.status(401).send('Error creating the message.')
    }
}

export const updateMessageController = async (req: express.Request, res: express.Response)=>{
    logger.info('PUT /updateMessage');
    const user: any = req.user;
    const id = req.params.id;
    const {name, description, code, price, photo} = req.body;
    const sql_statement = "UPDATE messages SET name = $1, description = $2, code = $3, stock = $4, price = $5, photo = $6 WHERE id = $7";
    
    if (user && user.role === "admin"){
        messageDAO.executeQuery(sql_statement,[name,description,code,price,photo,id],(data: any)=>{
            if(data && data.length > 0){
                return res.status(200).send("Message update successfully");
            }
            else {
                return res.status(301)   
            }
        });
    }else{
        return res.status(301)
    }
}

export const deleteMessageController = async (req: express.Request, res: express.Response)=>{
    logger.info('DELETE /deleteMessage');
    const user: any = req.user;
    const id = req.params.id;
    const sql_statement = "DELETE FROM messages WHERE id = $1"
    
    if (user && user.role === "admin"){
        messageDAO.executeQuery(sql_statement,[id],(data: any)=>{
            if(data && data.length > 0){
            return res.status(200).send("Message deleted successfully");
        }
        else {
            return res.status(301)   
        }
    });
    }else{
        return res.status(301)
    }
}