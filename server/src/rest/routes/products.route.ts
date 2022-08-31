import { Request, Response, Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import passport from "passport";
import { ParsedQs } from "qs";
import { ProductController } from "../controllers/products.controller";
import { IProductController } from "./interfaces/interfaces.routes";

const productController: IProductController = new ProductController()

const product = Router();

product.get("/", productController.getProducts)

product.get("/:id", productController.getProductById)

product.get("/user/cart/", passport.authenticate('jwt', { session: false }), productController.getUserCart)

product.post("/create", passport.authenticate('jwt', { session: false }), productController.createProduct)

product.post("/addtocart/:id", passport.authenticate('jwt', { session: false }), productController.addProductToCart)

product.post("/user/checkout", passport.authenticate('jwt', { session: false }), productController.userCheckout)

product.put("/update/:id", passport.authenticate('jwt', { session: false }), productController.updateProduct)

product.delete("/:id", passport.authenticate('jwt', { session: false }), productController.deleteProduct)

export default product;
