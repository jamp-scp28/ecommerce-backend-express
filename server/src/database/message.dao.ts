import { QueryResult } from "pg";
import { messageDTO } from "../models/message.dto";
import logger from "../rest/utils/logger/logger";
import { BaseRepository } from "./base.repository";

export class messageDao extends BaseRepository<messageDao> {

    async getMessages(): Promise<messageDTO[]> {
        const sql_statement = "SELECT * FROM messages";
        const response = await this.pool.query(sql_statement, []);
        logger.info(response.rows);
        return messageDao.mapMessageResponse(response);
    }

    async getMessageById(id: number): Promise<messageDTO> {
        const sql_statement = "SELECT * FROM messages where user_id = $1";
        const response = await this.pool.query(sql_statement, [id]);
        logger.info(response.rows);
        return messageDao.mapMessageResponse(response)[0];
    }

    async createMessage(message_name: string, description: string, code: string, price: number, photo: string, stock: number): Promise<string> {
        const sql_statement = "select * from createmessage($1, $2, $3, $4, $5, $6);"
        const response = await this.pool.query(sql_statement, [message_name, description, code, price, photo, stock]);
        logger.info(response);
        return response.rows;
    }

    async addMessageToCart(message_id: number, n_items: number, user_id: number): Promise<string> {
        const sql_statement = "select * from addmessageToCart($1, $2, $3);"
        const response = await this.pool.query(sql_statement, [message_id, n_items, user_id]);
        logger.info(response);
        return response.rows;
    }


    private static mapMessageResponse = (response: QueryResult): messageDTO[] =>
    response.rows.map((row: any) => {
        return {
            id: row.id,
            timestamp: row.timestamp,
            username: row.username,
            message: row.message
        }
    });
}