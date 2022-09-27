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

    public async getProductByCategory(category:string): Promise<Types.ProductDTO[]> {
        console.log('cat', category)
        const sql_statement = `
        select p.id, p.created_date, p.product_name, p.description, p.code, p.price, p.photo from products p
        left join categories c on c.id = p.category_id
        where c."name" = $1;
        `
        const response = await this.datasource.query(sql_statement, [category]);
        logger.info(response.rows);
        return this.mapProductResponse(response);
    }

    public async createProduct(product: Types.ProductDTO): Promise<any> {
        console.log(product)
        const {product_name, description, code, stock, price, photo, category} = product;
        const sql_statement = "select * from createProduct($1, $2, $3, $4, $5, $6, $7);"
        const response = await this.datasource.query(sql_statement, [product_name, description, code, price, photo, stock, category]);
        return {id: response.rows[0].createproduct};
    }

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
        const sql_statement = "select * from checkout($1)"
        const response = await this.datasource.query(sql_statement,[userId])
        return response.rows
    }

    public async updateProduct(data: {id: number, product: Partial<Types.ProductDTO>}): Promise<Types.ProductDTO> {
        const sql_statement = "UPDATE products SET product_name = $1, description = $2, code = $3, price = $4, photo = $5 WHERE id = $6 RETURNING *";
        const {product_name, description, code, price, photo} = data.product; 
        const response = await this.datasource.query(sql_statement,[product_name,description,code,price,photo,data.id])
        console.log(response.rows[0])
        return response.rows[0]
    }

    public async deleteProduct(productId: number) {
        try{
            const sql_statement = "DELETE FROM products u WHERE u.id IN (SELECT pr.id FROM products pr WHERE pr.id = $1)"
            const response = await this.datasource.query(sql_statement,[productId]);
            console.log('delete res', response)
            return 'Product deleted'
        }catch(e){
            console.log(e)
            return 'Sorry we could not delete the product.'
        }
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
            photo: row.photo,
            category: row.category
        }
    })
}