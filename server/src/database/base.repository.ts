import { Interfaces } from "../types";
import pool from "./connector/pgConnect";

export abstract class BaseRepository<T> implements Interfaces.Read<T>{

    public pool: any;

    constructor() {
        this.pool = pool;  
    }

    find(tableName: string): Promise<T[]> {
        const sql_statement = `SELECT * FROM ${tableName}`;
        const response = this.pool.query(sql_statement, []);
        return response.rows;
    }

    executeQuery = async (sql_statement: string, params: any, callback: Function) => {
        await pool.query(sql_statement, params, (error: any, results: any) => {
            if (error) {
                throw error
            }
        callback(results.rows);
        });
    } 

    executeWrite = async (sql_statement: string, params: any) => {
        await this.pool.query(sql_statement, params, (error: any, results: any) =>{
            if (error){
                throw error
            }
        return ('Process executed sucesfully...')
        })
    }
}