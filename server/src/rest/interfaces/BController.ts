import { IProductDao } from "../../database/interfaces/i.product.dao";

export interface BController {
   productDAO: IProductDao; 
}