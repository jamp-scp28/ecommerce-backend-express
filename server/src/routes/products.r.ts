import express from "express";
import { Router } from "express";
import logger from "../utils/logger";
import baseClass from "../database/baseClass";
import passport from "passport";
import {transporter, ProductCheckout, sendMail} from "../utils/mailConfig";

const productService = new baseClass();

const product = Router();

product.get("/", async (req: express.Request, res: express.Response)=>{
    logger.info('GET /products');
    productService.executeQuery("SELECT * FROM products",[],(data: any)=>{
        res.status(200).json(data);
    })
})

product.get("/:id", async (req: express.Request, res: express.Response)=>{
    logger.info('GET /products/:id');
    const id = req.params.id;
    productService.executeQuery("SELECT * FROM products where id = $1",[id],(data: any)=>{
        res.status(200).json(data);
    })
})

product.post("/create", passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response)=>{
    const user: any = req.user;
    const {product_name, description, code, stock, price, photo} = req.body;
    const sql_statement = "select * from createProduct($1, $2, $3, $4, $5, $6);"
    
    if (user && user.role === "admin"){
        productService.executeQuery(sql_statement,[product_name,description,code,price,photo,stock],(data: any)=>{
            if (data && data.length > 0){
                return res.status(200).send(`Product added successfully with id ${data.id}`);
            }else {
                return res.status(301).send('Error creating the product...') 
            }
        });
    }
    else {
        return res.status(301).send('Error creating the product...')
    }
})

product.post("/addtocart/:id", passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response)=>{
    const user: any = req.user;
    const product_id = req.params.id;
    const n_items = req.body.quantity; 

    console.log(user.id, product_id, n_items)

    const sql_statement = "select * from addProductToCart($1, $2, $3);" // $1 -> product_id, $2 -> # items, $3 -> user_id

    productService.executeQuery(sql_statement,[product_id, n_items, user.id],(data: any)=>{
        console.log(data);
        if (data && data.length > 0 ){
            return res.status(200).send('product added to cart.')
        }else {
            return res.status(301).send('could not add product to cart.')
        }
    })
})

product.get("/user/cart", passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
    const user: any = req.user;
    console.log('user', user)
    const sql_statement = 
    `
    with user_cart as (
	    select c.id, c.user_id, pc.product_id, pc.items from carts c left join product_cart pc on c.id = pc.cart_id
    )
    SELECT p.id, p.product_name, p.description, p.code, p.price, p.photo, uc.items
    FROM public.products p
    LEFT JOIN user_cart uc on p.id = uc.product_id
    WHERE uc.user_id = $1;
    `
    productService.executeQuery(sql_statement,[user.id],(data: any)=>{
        console.log(data);
        if (data && data.length > 0 ){
            return res.status(200).json({data})
        }else {
            return res.status(301).send('could not retrieve data...')
        }
    })
})

product.post("/user/checkout", passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
    const user: any = req.user;
    const sql_statement = "select * from checkout($1)";

    productService.executeQuery(sql_statement,[user.id],(data: any)=>{
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
})

product.put("/update/:id", passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response)=>{
    const user: any = req.user;
    const id = req.params.id;
    const {name, description, code, price, photo} = req.body;
    const sql_statement = "UPDATE products SET name = $1, description = $2, code = $3, stock = $4, price = $5, photo = $6 WHERE id = $7";

    if (user && user.role === "admin"){
    productService.executeQuery(sql_statement,[name,description,code,price,photo,id],(data: any)=>{
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
})

product.delete("/:id", passport.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response)=>{
    const user: any = req.user;
    const id = req.params.id;
    const sql_statement = "DELETE FROM products WHERE id = $1"

    if (user && user.role === "admin"){
    productService.executeQuery(sql_statement,[id],(data: any)=>{
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
})

export default product;