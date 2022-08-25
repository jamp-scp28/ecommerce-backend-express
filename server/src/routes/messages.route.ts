import { Router } from "express";
import passport from "passport";
import {
    getMessageByIdController,
    getMessagesController,
    createMessageController,
    updateMessageController,
    deleteMessageController    
} from "../controllers/message.controller";
const message = Router();

message.get("/", getMessagesController)

message.get("/:id", getMessageByIdController)

message.post("/create", passport.authenticate('jwt', { session: false }), createMessageController)

message.put("/update/:id", passport.authenticate('jwt', { session: false }), updateMessageController)

message.delete("/:id", passport.authenticate('jwt', { session: false }), deleteMessageController)

export default message;