import { Request, Response, Router } from "express";
import passport from "passport";
import { OrderController } from "../controllers/order.controller";
import { IOrderController } from "./interfaces/interfaces.routes";

const orderController: IOrderController = new OrderController()

const order = Router();

order.get("/", passport.authenticate('jwt', {session: false}), orderController.getOrders)
order.get("/user", passport.authenticate('jwt', {session: false}), orderController.getUserOrders)

export default order;