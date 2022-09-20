import ProductSlice from "../reducers/product-slice";
import { AnyAction } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../reduxStore";
import { ProductModel } from "../../models/reduxModels";
import {getProducts} from "../../services/productService";
import axios from "axios";

export const productActions = ProductSlice.actions;

export const fetchProducts=(): ThunkAction<void,RootState,unknown,AnyAction>=>{
    return async(dispatch, getState)=>{
        if (getState().products.all_products.length === 0){
            const response: ProductModel[] = await axios.get(`http://localhost:8081/api/v1/products`)
            .then(res => {
                console.log('product data', res.data)
                return res.data;
            });
            dispatch(productActions.setProducts(response));
        }
    }
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
}