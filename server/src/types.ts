import { QueryResult } from "pg";

declare global {
    namespace Express {
        interface User {
            username: string
            _id?: number
        }
    }
}

export namespace Types{
    export type User ={
        username: string
        email: string
        password?: string
        fullname: string
        address?: string
        age?: number
        phone_number_prefix?: string
        phone_number: number
        avatar?: string
        role?: string
    }

    export type ChatDTO = {
        id: number
        timestamp: Date
        email: string
        message: string
    }
    
    export type ProductDTO = {
        id: number
        product_name: string
        description: string
        code: string
        stock: number
        price: number
        photo: string
        category: string
    }

    export type OrderDTO = {
        id: number,
        sale_date: Date,
        user_id: number,
        cart_id?: number,
        product_id: number,
        items: number,
        price: number,
        total: number
    }
}

export namespace Interfaces {

    export interface ProductDao {
        getProducts(): Promise<Types.ProductDTO[]>;
        getProductById(data: {id: number}): Promise<Types.ProductDTO>;
        getProductByCategory(category: string): Promise<Types.ProductDTO[]>;
        createProduct(product: Types.ProductDTO): Promise<number>;
        addProductToCart(
            product_id: number,
            n_items: number,
            user_id: number
        ): Promise<string>;
        
        getUserCart(user_id: number): Promise<string>;
        userCheckout(userId: number): Promise<string>;
        updateProduct(data: {id: number, product: Partial<Types.ProductDTO>}): Promise<Types.ProductDTO>;
        deleteProduct(productId: number): Promise<string>;
        mapProductResponse(response: QueryResult): Types.ProductDTO[];
    }

    export interface AuthDao {
        getUser(email: string): any;
        login(email: string, password: string): any;
        register(user: Types.User): Promise<any>;
        logout(): Promise<any>;
    }

    export interface ChatDAO{
        getChats(): Promise<Types.ChatDTO[]>;
        getChatByEmail(email: string): Promise<Types.ChatDTO[]>;
        createChat(newChat: Types.ChatDTO): Promise<number|string>;
        updateChat(id: number, chat: Partial<Types.ChatDTO>): Promise<Types.ChatDTO>;
        deleteChat(email: string): Promise<Types.ChatDTO>;
        mapChatResponse?(response: QueryResult): Types.ChatDTO[];
    }

    export interface OrdersDAO{
        getOrders(): Promise<Types.OrderDTO[]>;
        getUserOrders(userId: number): Promise<Types.OrderDTO[]>;
        mapOrdersResponse?(response: QueryResult): Types.OrderDTO[];
    }

    export interface IDatabaseFactory {
       (tableName: string): Interfaces.ProductDao | Interfaces.ChatDAO | undefined;
    }

    export interface Write<T> {
      create(item: T): Promise<boolean>;
      update(id: string, item: T): Promise<boolean>;
      delete(id: string): Promise<boolean>;
    }

    export interface Read<T> {
      find(tableName: string): Promise<T[]>;
    }
}