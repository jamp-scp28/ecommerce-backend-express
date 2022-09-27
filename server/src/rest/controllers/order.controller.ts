import logger from "../utils/logger/logger";
import express from "express";
import { Types, Interfaces} from "../../types"
import { orderDao } from "../../database/order.dao";

export class OrderController { 
    
    private orderDAO!: Interfaces.OrdersDAO; 

    constructor(){
        this.orderDAO = new orderDao();
    }
    
    /**
   * @openapi
   * /api/v1/orders:
   *   get:
   *     tags: [Orders]
   *     description: Get all orders
   *     security:
   *       - Authorization: []
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
    public getOrders = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /products');
        const response: Types.OrderDTO[] = await this.orderDAO.getOrders(); 
        res.status(200).json(response)
    }

    /**
   * @openapi
   * /api/v1/orders/user:
   *   get:
   *     tags: [Orders]
   *     description: Get orders by User
   *     security:
   *       - Authorization: []
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
    public getUserOrders = async (req: express.Request, res: express.Response)=>{
        const user: any = req.user
        const response: Types.OrderDTO[] = await this.orderDAO.getUserOrders(parseInt(user!.id)); 
        res.json(response)
    }
}