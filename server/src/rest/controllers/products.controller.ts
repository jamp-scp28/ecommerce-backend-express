import logger from "../utils/logger/logger";
import express from "express";
import { productDao } from "../../database/product.dao";
import { Types, Interfaces} from "../../types"
import {ProductCheckout, sendMail} from "../utils/config/mailConfig";

export class ProductController { 
    
    private productDAO!: Interfaces.ProductDao; 

    constructor(){
        this.productDAO = new productDao();
    }
    
    /**
   * @openapi
   * /api/v1/products:
   *   get:
   *     tags: [Products]
   *     description: Get all products
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
    public getProducts = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /products');
        const response: Types.ProductDTO[] = await this.productDAO.getProducts(); 
        res.status(200).json(response)
    }

    /**
   * @openapi
   * /api/v1/products/{id}:
   *   get:
   *     tags: [Products]
   *     description: Get product by ID
   *     parameters:
   *       - in: path
   *         name: id 
   *         type: number
   *         required: true
   *         description: product ID
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
    public getProductById = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /products/:id');
        const id = parseInt(req.params.id);
        const response: Types.ProductDTO = await this.productDAO.getProductById({id: id}); 
        res.json(response)
    }


    /**
   * @openapi
   * /api/v1/products/category/{category}:
   *   get:
   *     tags: [Products]
   *     description: Get product by Category
   *     parameters:
   *       - in: path
   *         name: category 
   *         type: string
   *         required: true
   *         description: Category Name
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
    public getProductByCategory = async (req: express.Request, res: express.Response)=>{
        logger.info('GET /products/:category');
        const category: string = req.params.category
        const response: Types.ProductDTO[] = await this.productDAO.getProductByCategory(category); 
        res.json(response)
    }

    /**
   * @openapi
   * /api/v1/products/create:
   *   post:
   *     tags: [Products]
   *     description: Create a new product, please enter a valid category name from the available list
   *     security:
   *       - Authorization: []
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              product_name:          
   *                type: string
   *              description:    
   *                type: string  
   *              code:    
   *                type: string
   *              stock:    
   *                type: number
   *              price:    
   *                type: number
   *              photo:    
   *                type: string
   *              category:
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
    public createProduct = async (req: express.Request, res: express.Response)=>{
        logger.info('POST /createProduct');
        const user: any = req.user;

        console.log('current user', user)

        if (user){
            const response: number = await this.productDAO.createProduct(req.body);
            return res.status(200).json(response)
        }

        return res.status(401).json({response:'Error creating the product.'})
    }

     /**
   * @openapi
   * /api/v1/products/addtocart/{id}:
   *   post:
   *     tags: [Carts]
   *     description: Add product by ID, to current user cart
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id 
   *         type: number
   *         required: true
   *         description: product ID
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              quantity:          
   *                type: number
   *     responses:
   *       200:
   *         description: User Cart
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *       500:
   *         $ref: '#/components/responses/500'
   */
    public addProductToCart = async (req: express.Request, res: express.Response)=>{
        logger.info('POST /addProductToCart');
        const user: any = req.user;
        const product_id = parseInt(req.params.id);
        const n_items = req.body.quantity; 
        console.log('addtocartdata',user.id, product_id, n_items)
        const response = await this.productDAO.addProductToCart(product_id, n_items, user.id);
        res.status(200).json(response)   
    }

        /**
   * @openapi
   * /api/v1/products/user/cart:
   *   get:
   *     tags: [Carts]
   *     description: Get User Cart
   *     security:
   *       - Authorization: []
   *     responses:
   *       200:
   *         description: User cart
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *       500:
   *         $ref: '#/components/responses/500'
   */ 
    public getUserCart = async (req: express.Request, res: express.Response) => {
        logger.info('GET /getUserCart');
        const user: any = req.user;
        logger.info('user trying to get cart info', user)
        const response = await this.productDAO.getUserCart(user.id); 
        res.status(200).json(response)
    }

    /**
   * @openapi
   * /api/v1/products/user/checkout:
   *   post:
   *     tags: [Carts]
   *     description: Gets the user products in the cart and send them to orders 
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
    public userCheckout = async (req: express.Request, res: express.Response) => {
        logger.info('POST /userCheckout');
        const user: any = req.user;
        const response: any = await this.productDAO.userCheckout(user.id) 
        if (response.checkout !== 0){
            sendMail(ProductCheckout(user))
            return res.status(200).json(response)
        }
        return res.status(500).json({message: 'User does not have any product in the cart.'})
    }

     /**
   * @openapi
   * /api/v1/products/update/{id}:
   *   put:
   *     tags: [Products]
   *     description: Update a product
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id 
   *         type: number
   *         required: true
   *         description: product ID
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              product_name:          
   *                type: string
   *              description:    
   *                type: string  
   *              code:    
   *                type: string
   *              stock:    
   *                type: number
   *              price:    
   *                type: number
   *              photo:    
   *                type: string
   *              category:
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
    public updateProduct = async (req: express.Request, res: express.Response)=>{
        logger.info('PUT /updateProduct');
        const id = parseInt(req.params.id);
        const product = req.body;
        const data = {id, product}
        const response = await this.productDAO.updateProduct(data); 
        if(response){
            return res.status(200).json(response)
        }
        return res.status(500).json({response: 'Error updating the product'})
    }

    /**
   * @openapi
   * /api/v1/products/{id}:
   *   delete:
   *     tags: [Products]
   *     description: Delete product by ID
   *     security:
   *       - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id 
   *         type: number
   *         required: true
   *         description: product ID
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
    public deleteProduct = async (req: express.Request, res: express.Response)=>{
        logger.info('DELETE /deleteProduct');
        const productId = parseInt(req.params.id);
        const response = await this.productDAO.deleteProduct(productId)
        res.send({response}) 
    }
}