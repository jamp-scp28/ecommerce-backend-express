import { QueryResult } from "pg";
import logger from "../rest/utils/logger/logger";
import { Types, Interfaces} from "../types"
import pool from "./connector/pgConnect";
import {ProductCheckout, sendMail} from "../rest/utils/config/mailConfig";

export class productDao implements Interfaces.ProductDao {

    private datasource: any;

    constructor(){
        this.datasource = pool;
    }
    
    public async getProducts(): Promise<Types.ProductDTO[]> {
        const sql_statement = "SELECT * FROM products";
        const response = await this.datasource.query(sql_statement, []);
        logger.info(response.rows);
        return this.mapProductResponse(response);
    }

    public async getProductById(data: {id: number}): Promise<Types.ProductDTO> {
        console.log('receiving id request', data.id)
        const sql_statement = "SELECT * FROM products where id = $1";
        const response = await this.datasource.query(sql_statement, [data.id]);
        logger.info(response.rows);
        return this.mapProductResponse(response)[0];
    }

    public async createProduct(data: {product: Types.ProductDTO}): Promise<any> {
        const {product_name, description, code, stock, price, photo} = data.product;
        const sql_statement = "select * from createProduct($1, $2, $3, $4, $5, $6);"
        const response = await this.datasource.query(sql_statement, [product_name, description, code, price, photo, stock]);
        return {id: response.rows[0].createproduct};
    }
    
    /*old version of endpoint
    public async createProducts(product_name: string, description: string, code: string, price: number, photo: string, stock: number): Promise<any> {
        console.log('receiving request to crate product...')
        console.log(product_name, description, code, price, photo, stock)
        const sql_statement = "select * from createProduct($1, $2, $3, $4, $5, $6);"

        const response = await this.datasource.query(sql_statement, [product_name, description, code, price, photo, stock]);
        logger.info(response);
        const respo = {product_name, description, code, price, photo, stock}
        return respo;
    }*/

    public async addProductToCart(product_id: number, n_items: number, user_id: number): Promise<string> {
        const sql_statement = "select * from addProductToCart($1, $2, $3);"
        const response = await this.datasource.query(sql_statement, [product_id, n_items, user_id]);
        logger.info(response);
        return response.rows;
    }

    public async getUserCart(user_id: number): Promise<string> {
        const sql_statement =`
        with user_cart as (
            select c.id, c.user_id, pc.product_id, pc.items from carts c left join product_cart pc on c.id = pc.cart_id
            )
            SELECT p.id, p.product_name, p.description, p.code, p.price, p.photo, uc.items
            FROM public.products p
            LEFT JOIN user_cart uc on p.id = uc.product_id
            WHERE uc.user_id = $1;
        `
        const reponse = await this.datasource.query(sql_statement, [user_id]);
        return reponse.rows;
    }

    public async userCheckout(userId: number): Promise<string> {
        const sql_statement = "select * from checkout($1)";
        const response = await this.datasource.query(sql_statement,userId)
        logger.log(response)
        return response
    }

    public async updateProduct(data: {id: number, product: Partial<Types.ProductDTO>}): Promise<Types.ProductDTO> {
        const sql_statement = "UPDATE products SET product_name = $1, description = $2, code = $3, price = $4, photo = $5 WHERE id = $6 RETURNING *";
        const {product_name, description, code, price, photo} = data.product; 
        const response = await this.datasource.query(sql_statement,[product_name,description,code,price,photo,data.id])
        console.log(response.rows[0])
        return response.rows[0]
    }

    public async deleteProduct(data: {productId: number}) {
        const sql_statement = "DELETE FROM products WHERE id = $1 RETURNING *"
        const response = await this.datasource.query(sql_statement,[data.productId]);
        return response.rows[0];
    }

    public mapProductResponse = (response: QueryResult): Types.ProductDTO[] =>
    response.rows.map((row: any) => {
        return {
            id: row.id,
            product_name: row.product_name,
            description: row.description,
            code: row.code,
            stock: row.stock,
            price: row.price,
            photo: row.photo
        }
    });
}