import { QueryResult } from "pg";
import { ProductDTO } from "../../models/product.dto";

export interface IProductDao {
    
    getProducts(): Promise<ProductDTO[]>;
    
    getProductById(id: number): Promise<ProductDTO>;
    
    createProduct(
        product_name: string,
        description: string,
        code: string,
        price: number,
        photo: string,
        stock: number): Promise<string>;
    
    addProductToCart(
        product_id: number,
        n_items: number,
        user_id: number
    ): Promise<string>;

    getUserCart(user_id: number): Promise<string>;

    userCheckout(userId: number): Promise<string>;

    updateProduct(userId: number, data: Partial<ProductDTO>): Promise<string>;

    deleteProduct(productId: string): Promise<any>;

    mapProductResponse(response: QueryResult): ProductDTO[];

}