import { ProductModel, ProductArrayModel } from "../../models/reduxModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialProductState: ProductArrayModel={
    all_products:[],
    product: {
        "created_date": "",
        "id": 0,
        "product_name": "",
        "description": "",
        "code": "",
        "price": 0,
        "photo": ""
    }
}

const ProductSlice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers:{
        setProducts(state,action:PayloadAction<ProductModel[]>){
            state.all_products=action.payload;
        },
        setProduct(state,action:PayloadAction<ProductModel>){
            state.product=action.payload;
        }
    }
})

export default ProductSlice;