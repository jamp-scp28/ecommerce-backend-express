import { QueryResult } from "pg";
import { ProductDTO } from "../../models/product.dto";

export interface IProductDao {
    
    getProducts(): Promise<ProductDTO[]>;
    
    getProductById(data: {id: number}): Promise<ProductDTO>;
    
    createProduct(data: {product: ProductDTO}): Promise<number>;
    
    addProductToCart(
        product_id: number,
        n_items: number,
        user_id: number
    ): Promise<string>;

    getUserCart(user_id: number): Promise<string>;

    userCheckout(userId: number): Promise<string>;

    updateProduct(data: {id: number, product: Partial<ProductDTO>}): Promise<ProductDTO>;

    deleteProduct(data: {productId: number}): Promise<ProductDTO>;

    mapProductResponse(response: QueryResult): ProductDTO[];

}