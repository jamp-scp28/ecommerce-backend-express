import { Router } from "express";
import passport from "passport";
import { ChatController } from "../controllers/chat.controller";

const chatController = new ChatController();
const chat = Router();

chat.get("/", chatController.getChats)
chat.get("/:id", chatController.getChatByEmail)
chat.post("/create", passport.authenticate('jwt', { session: false }), chatController.createChat)
chat.put("/update/:id", passport.authenticate('jwt', { session: false }), chatController.updateChat)
chat.delete("/:id", passport.authenticate('jwt', { session: false }), chatController.deleteChat)

export default chat;