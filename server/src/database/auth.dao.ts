import pool from "./connector/pgConnect";
import { validateUser } from "../rest/utils/jwt/jwt-utils";
import { Types, Interfaces } from "../types";

export class AuthDAO implements Interfaces.AuthDao{
    private datasource: any;

    constructor(){
        this.datasource = pool;
    }
    public async getUser(email: string) {
        const sql_statement = "select u.username, u.id, u.email, ur.role, password from users u left join user_roles ur on u.id = ur.user_id where u.email = $1;";
        const userData = this.datasource.query(sql_statement,[email]); 
        return userData
    }

    public async login(email: string, password: string) {
        const sql_statement = "select u.username, u.id, u.email, ur.role, password from users u left join user_roles ur on u.id = ur.user_id where u.email = $1;"
        const userData = await this.datasource.query(sql_statement, [email]);
        const response = validateUser(password, userData.rows[0]);
        return response;
    }

    public async register(user: Types.User): Promise<any> {
        const { username, email, password, fullname, address, age, phone_number_prefix, phone_number, avatar } = user
        const sql_statement_createuser = "select * from createUser($1, $2, $3, $4, $5, $6, $7, $8, $9)"
        const response = await this.datasource.query(sql_statement_createuser,[username, email, password, fullname, address, age, phone_number_prefix, phone_number, avatar])
        console.log(response.rows[0].createuser)
        return response.rows[0].createuser
    }
    logout(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}