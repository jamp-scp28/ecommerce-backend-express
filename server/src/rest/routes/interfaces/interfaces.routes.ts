export interface IProductController {
    getProducts(...args: any[]): void
    getProductById(...args: any[]): void
    createProduct(...args: any[]): void
    addProductToCart(...args: any[]): void
    getUserCart(...args: any[]): void
    userCheckout(...args: any[]): void
    updateProduct(...args: any[]): void
    deleteProduct(...args: any[]): void
}