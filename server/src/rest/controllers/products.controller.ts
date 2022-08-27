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
    
    public getProductsController = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /products');
        const response: ProductDTO[] = await this.productDAO.getProducts(); 
        res.json(response)
    }

    public getProductByIdController = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /products/:id');
        const id = parseInt(req.params.id);
        const response: ProductDTO = await this.productDAO.getProductById(id); 
        res.json(response)
    }

    public createProductController = async (req: express.Request, res: express.Response)=>{
        logger.info('POST /createProduct');
        const user: any = req.user;
        const {product_name, description, code, stock, price, photo} = req.body;

        if (user && user.role === "admin"){
            const response: string = await this.productDAO.createProduct(product_name, description, code, price, photo, stock);
            res.status(200).json(response)
        }
        else {
            res.status(401).send('Error creating the product.')
        }
    }

    public addProductToCartController = async (req: express.Request, res: express.Response)=>{
        logger.info('POST /addProductToProduct');
        const user: any = req.user;
        const product_id = parseInt(req.params.id);
        const n_items = req.body.quantity; 
        console.log('addtocartdata',user.id, product_id, n_items)
        const response = await this.productDAO.addProductToCart(product_id, n_items, user.id);
        res.status(200).json(response)   
    }

    public getUserCartController = async (req: express.Request, res: express.Response) => {
        logger.info('GET /getUserCart');
        const user: any = req.user;
        logger.info('user trying to get cart info', user)
        const response = await this.productDAO.getUserCart(user.id); 
        res.status(200).json(response)
    }

    public userCheckoutController = async (req: express.Request, res: express.Response) => {
        logger.info('POST /userCheckout');
        const user: any = req.user;
        const sql_statement = "select * from checkout($1)";
        
        this.productDAO.executeQuery(sql_statement,[user.id],(data: any)=>{
            if(data && data.length > 0){
                // Send email to admin
                const mailReponse = sendMail(ProductCheckout);
                logger.info(mailReponse);
                
                return res.status(200).json({"message:":"Checkout completed...", "order_data":data});
            }
            else {
                return res.status(301).send("nothing to checkout...")   
            }
        });
    }

    public updateProductController = async (req: express.Request, res: express.Response)=>{
        logger.info('PUT /updateProduct');
        const user: any = req.user;
        const id = req.params.id;
        const {name, description, code, price, photo} = req.body;
        const sql_statement = "UPDATE products SET name = $1, description = $2, code = $3, stock = $4, price = $5, photo = $6 WHERE id = $7";
        
        if (user && user.role === "admin"){
            this.productDAO.executeQuery(sql_statement,[name,description,code,price,photo,id],(data: any)=>{
                if(data && data.length > 0){
                    return res.status(200).send("Product update successfully");
                }
                else {
                    return res.status(301)   
                }
            });
        }else{
            return res.status(301)
        }
    }

    public deleteProductController = async (req: express.Request, res: express.Response)=>{
        logger.info('DELETE /deleteProduct');
        const user: any = req.user;
        const id = req.params.id;
        const sql_statement = "DELETE FROM products WHERE id = $1"
        
        if (user && user.role === "admin"){
            this.productDAO.executeQuery(sql_statement,[id],(data: any)=>{
                if(data && data.length > 0){
                    return res.status(200).send("Product deleted successfully");
                }
                else {
                    return res.status(301)   
            }
        });
    }else{
        return res.status(301)
    }
    }
}