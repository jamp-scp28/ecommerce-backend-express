import { Router } from "express";
import passport from "passport";
import { 
    getProductsController,
    getProductByIdController,
    createProductController,
    addProductToCartController,
    getUserCartController,
    userCheckoutController,
    updateProductController,
    deleteProductController
 } from "../controllers/products.controller";

const product = Router();

product.get("/", getProductsController)

product.get("/:id", getProductByIdController)

product.get("/user/cart/", passport.authenticate('jwt', { session: false }), getUserCartController)

product.post("/create", passport.authenticate('jwt', { session: false }), createProductController)

product.post("/addtocart/:id", passport.authenticate('jwt', { session: false }), addProductToCartController)

product.post("/user/checkout", passport.authenticate('jwt', { session: false }), userCheckoutController)

product.put("/update/:id", passport.authenticate('jwt', { session: false }), updateProductController)

product.delete("/:id", passport.authenticate('jwt', { session: false }), deleteProductController)

export default product;