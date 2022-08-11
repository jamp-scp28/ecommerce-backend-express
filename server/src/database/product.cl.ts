import baseClass from "./base.cl";
import { QueryResult } from "pg";
import { ProductDTO } from "./models/product.dto";
import logger from "../utils/logger";
import pool from "../utils/pgConnect";

export class productClass extends baseClass {

    async getProducts(): Promise<ProductDTO[]> {
        const sql_statement = "SELECT * FROM products";
        const response = await this.pool.query(sql_statement, []);
        logger.info(response.rows);
        return productClass.mapProductResponse(response);
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