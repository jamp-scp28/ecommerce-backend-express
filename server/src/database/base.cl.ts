import { Client } from "pg";
import pool from "../utils/pgConnect";

class baseClass {

  pool: any

  constructor() {
    this.pool = pool;  
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

export default baseClass;