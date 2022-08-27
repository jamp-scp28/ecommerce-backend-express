import {ProductDTO} from "../models/product.dto";
import {messageDTO} from "../models/message.dto";

interface IProductDao{
    getProducts(): Promise<ProductDTO[]>;
}

interface IMessageDao{
    getMessages(): Promise<messageDTO[]>;
}

export interface IDatabaseFactory {
   (tableName: string): IProductDao | IMessageDao | undefined;
}

export interface IWrite<T> {
  create(item: T): Promise<boolean>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export interface IRead<T> {
  find(tableName: string): Promise<T[]>;
}