import { QueryResult } from "pg";
import { Types } from "../types";
import logger from "../rest/utils/logger/logger";
import datasource from "./connector/pgConnect";

export class orderDao implements orderDao{
    private datasource: any;

    constructor(){
        this.datasource = datasource;
    }

    async getOrders(): Promise<Types.OrderDTO[]> {
        const sql_statement = "SELECT * FROM orders";
        const response = await this.datasource.query(sql_statement, []);
        return orderDao.mapOrderResponse(response);
    }

    async getUserOrders(userId: number): Promise<Types.OrderDTO[]> {
        const sql_statement = "SELECT * FROM orders where user_id = $1";
        const response = await this.datasource.query(sql_statement, [userId]);
        return orderDao.mapOrderResponse(response)
    }

    private static mapOrderResponse = (response: QueryResult): Types.OrderDTO[] =>
    response.rows.map((row: Types.OrderDTO) => {
        return {
            id: row.id,
            sale_date: row.sale_date,
            user_id: row.user_id,
            cart_id: row.cart_id,
            product_id: row.product_id,
            items: row.items,
            price: row.price,
            total: row.total
        }
    })
}