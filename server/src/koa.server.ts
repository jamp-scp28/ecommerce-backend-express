import koa, { Next } from "koa"
import Router from "koa-router"
import bodyParser from "koa-body"
import { IProductDao } from "./database/interfaces/i.product.dao";
import { productDao } from "./database/product.dao";
import { ProductDTO } from "./models/product.dto";

const app = new koa();
const productDAO: IProductDao = new productDao(); 
//Define Routes

const router = new Router({
    prefix: '/api/v1'
});

router.get('/products', async (ctx: any, next: Next)=>{
    const response: ProductDTO[] = await productDAO.getProducts();
    ctx.body = response;
    next();
});

router.get('/product/:id', async (ctx: any, next: Next) => {
    const id = ctx.params.id;
    const response: ProductDTO = await productDAO.getProductById(id);
    ctx.body = response;
    next();
})

router.post('/product',async (ctx: any, next: Next) => {
    const productData: ProductDTO = ctx.request.body; 
    const response = await productDAO.createProduct({product: productData});
    ctx.body = response;
    next();
})

router.put('/product/:id', async (ctx: any, next: Next) =>{
    const id: number = parseInt(ctx.params.id);
    const newProductData: Partial<ProductDTO> = ctx.request.body;
    const response = await productDAO.updateProduct({id: id, product: newProductData})
    ctx.body = response;
    next();
})

router.delete('/product/:id', async (ctx: any, next: Next)=>{
    const id: number = parseInt(ctx.params.id);
    const response = await productDAO.deleteProduct({productId: id});
    ctx.body = response;
    next();
})

app.use(bodyParser());

app.use(router.routes());

app.listen(4040);