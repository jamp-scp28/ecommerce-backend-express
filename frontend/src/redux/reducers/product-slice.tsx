import { ProductModel, ProductArrayModel } from "../../models/reduxModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialProductState: ProductArrayModel={
    all_products:[],
<<<<<<< HEAD
    user_products_cart: [],
=======
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
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
<<<<<<< HEAD
        },
        setUserProductsCart(state, action: PayloadAction<ProductModel[]>){
            state.user_products_cart=action.payload;
=======
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
        }
    }
})

export default ProductSlice;