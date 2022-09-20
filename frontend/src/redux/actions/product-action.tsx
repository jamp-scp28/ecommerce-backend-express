import ProductSlice from "../reducers/product-slice";
import { AnyAction } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../reduxStore";
import { ProductModel } from "../../models/reduxModels";
<<<<<<< HEAD
import {getProducts} from "../../services/productService";
=======
import getProducts from "../../services/productService";
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
import axios from "axios";

export const productActions = ProductSlice.actions;

export const fetchProducts=(): ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch, getState)=>{
        if (getState().products.all_products.length === 0){
            const response: ProductModel[] = await axios.get(`http://localhost:8081/api/v1/products`)
            .then(res => {
<<<<<<< HEAD
                console.log('product data', res.data)
=======
                console.log('response', res)
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
                return res.data;
            });
            dispatch(productActions.setProducts(response));
        }
    }
<<<<<<< HEAD
}

export const fetchUserCartProducts = (): ThunkAction<void, RootState, unknown, AnyAction>=>{
    console.log('fetching product cart data...')
    return async(dispatch, getstate)=>{
        const {user} = getstate();

        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`,
            }
        }

        if(getstate().products.user_products_cart.length === 0){
            const response: any = await axios.get(
                "http://localhost:8081/api/v1/products/user/cart/",
                config
            ).then(res=>{
                return res.data.data;
            });
            console.log('response from user car products', response);
            dispatch(productActions.setUserProductsCart(response));
        }
    }
=======
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
}