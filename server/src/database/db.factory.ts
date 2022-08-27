import { table } from "console";
import { messageDao } from "./message.dao";
import { productDao } from "./product.dao";
import { IDatabaseFactory } from "../interfaces/interfaces";

const DatabaseFactory: IDatabaseFactory = (tableName: string) => {
    if (tableName === "product"){
        return new productDao();
    }
    else if (tableName === "message"){
        return new messageDao();
    }
    else {
        return undefined;
    }
}

export default DatabaseFactory;