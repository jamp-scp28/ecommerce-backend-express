import logger from "../utils/logger/logger";
import express from "express";
import {ProductCheckout, sendMail} from "../utils/config/mailConfig";
import { ProductDTO } from "../../models/product.dto";
import DatabaseFactory from "../../database/db.factory";
import { IDatabaseFactory } from "../../interfaces/interfaces";
import { BaseRepository } from "../../database/base.repository";
import { productDao } from "../../database/product.dao";
import { IProductDao } from "../../database/interfaces/i.product.dao";
import { BController } from "../interfaces/BController";


export class ProductController { 
    
    private productDAO!: IProductDao; 

    constructor(){
        this.productDAO = new productDao();
    }
    
    public getProducts = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /products');
        const response: ProductDTO[] = await this.productDAO.getProducts(); 
        res.json(response)
    }

    public getProductById = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /products/:id');
        const id = parseInt(req.params.id);
        const response: ProductDTO = await this.productDAO.getProductById({id: id}); 
        res.json(response)
    }

    public createProduct = async (req: express.Request, res: express.Response)=>{
        logger.info('POST /createProduct');
        const user: any = req.user;

        if (user && user.role === "admin"){
            const response: number = await this.productDAO.createProduct(req.body);
            res.status(200).json(response)
        }
        else {
            res.status(401).send('Error creating the product.')
        }
    }

    public addProductToCart = async (req: express.Request, res: express.Response)=>{
        logger.info('POST /addProductToProduct');
        const user: any = req.user;
        const product_id = parseInt(req.params.id);
        const n_items = req.body.quantity; 
        console.log('addtocartdata',user.id, product_id, n_items)
        const response = await this.productDAO.addProductToCart(product_id, n_items, user.id);
        res.status(200).json(response)   
    }

    public getUserCart = async (req: express.Request, res: express.Response) => {
        logger.info('GET /getUserCart');
        const user: any = req.user;
        logger.info('user trying to get cart info', user)
        const response = await this.productDAO.getUserCart(user.id); 
        res.status(200).json(response)
    }

    public userCheckout = async (req: express.Request, res: express.Response) => {
        logger.info('POST /userCheckout');
        const user: any = req.user;
        const response = await this.productDAO.userCheckout(user.id) 
        res.send({response})
    }

    public updateProduct = async (req: express.Request, res: express.Response)=>{
        logger.info('PUT /updateProduct');
        const id = parseInt(req.params.id);
        const product = req.body;
        const data = {id, product}
        const response = await this.productDAO.updateProduct(data); 
    }

    public deleteProduct = async (req: express.Request, res: express.Response)=>{
        logger.info('DELETE /deleteProduct');
        const user: any = req.user;
        const productId = {productId: parseInt(req.params.id)};
        const response = await this.productDAO.deleteProduct(productId)
        res.send({response}) 
    }
    
}