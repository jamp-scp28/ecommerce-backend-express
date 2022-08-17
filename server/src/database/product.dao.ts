import { QueryResult } from "pg";
import { ProductDTO } from "./models/product.dto";
import logger from "../utils/logger";
import { BaseRepository } from "./base.repository";

export class productDao extends BaseRepository<productDao> {
    name: string;
    constructor(){
        super();
        this.name = "product"
    }
    
    async getProducts(): Promise<ProductDTO[]> {
        const sql_statement = "SELECT * FROM products";
        const response = await this.pool.query(sql_statement, []);
        logger.info(response.rows);
        return productDao.mapProductResponse(response);
    }

    async getProductById(id: number): Promise<ProductDTO> {
        const sql_statement = "SELECT * FROM products where id = $1";
        const response = await this.pool.query(sql_statement, [id]);
        logger.info(response.rows);
        return productDao.mapProductResponse(response)[0];
    }

    async createProduct(product_name: string, description: string, code: string, price: number, photo: string, stock: number): Promise<string> {
        const sql_statement = "select * from createProduct($1, $2, $3, $4, $5, $6);"
        const response = await this.pool.query(sql_statement, [product_name, description, code, price, photo, stock]);
        logger.info(response);
        return response.rows;
    }

    async addProductToCart(product_id: number, n_items: number, user_id: number): Promise<string> {
        const sql_statement = "select * from addProductToCart($1, $2, $3);"
        const response = await this.pool.query(sql_statement, [product_id, n_items, user_id]);
        logger.info(response);
        return response.rows;
    }

    async getUserCart(user_id: number): Promise<string> {
        const sql_statement =`
        with user_cart as (
            select c.id, c.user_id, pc.product_id, pc.items from carts c left join product_cart pc on c.id = pc.cart_id
            )
            SELECT p.id, p.product_name, p.description, p.code, p.price, p.photo, uc.items
            FROM public.products p
            LEFT JOIN user_cart uc on p.id = uc.product_id
            WHERE uc.user_id = $1;
        `
        const reponse = await this.pool.query(sql_statement, [user_id]);
        return reponse.rows;
    }

    private static mapProductResponse = (response: QueryResult): ProductDTO[] =>
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