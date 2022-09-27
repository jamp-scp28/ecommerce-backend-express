import { QueryResult } from "pg";
import { Types } from "../types";
import logger from "../rest/utils/logger/logger";
import datasource from "./connector/pgConnect";

export class chatDao implements chatDao{
    private datasource: any;

    constructor(){
        this.datasource = datasource;
    }

    async getChats(): Promise<Types.ChatDTO[]> {
        const sql_statement = "SELECT * FROM chat";
        const response = await this.datasource.query(sql_statement, []);
        return chatDao.mapChatResponse(response);
    }

    async getChatByEmail(email: string): Promise<Types.ChatDTO[]> {
        const sql_statement = "SELECT * FROM chat where email = $1";
        const response = await this.datasource.query(sql_statement, [email]);
        return chatDao.mapChatResponse(response)
    }

    async createChat(chat: Types.ChatDTO): Promise<string> {
        const {timestamp, email, message} = chat;
        const sql_statement = "INSERT INTO chat (timestamp, email, message) VALUES($1, $2, $3);"
        const response = await this.datasource.query(sql_statement, [timestamp, email, message]);
        logger.info(response);
        return response.rows;
    }

    public async updateChat(chatId: number,chat: Partial<Types.ChatDTO>): Promise<Types.ChatDTO> {
        const {timestamp, email, message} = chat; 
        const sql_statement = "UPDATE chat SET timestamp = $1, email = $2, message = $3 WHERE id = $4 RETURNING *";
        const response = await this.datasource.query(sql_statement,[timestamp, email, message, chatId])
        console.log(response.rows[0])
        return response.rows[0]
    }

    public async deleteChat(email:string) {
        const sql_statement = "DELETE FROM chat WHERE email = $1 RETURNING *"
        const response = await this.datasource.query(sql_statement,[email]);
        return response.rows[0];
    }

    private static mapChatResponse = (response: QueryResult): Types.ChatDTO[] =>
    response.rows.map((row: Types.ChatDTO) => {
        return {
            id: row.id,
            timestamp: row.timestamp,
            email: row.email,
            message: row.message
        }
    });
}