import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchProducts } from "../../redux/actions/product-action";
import { useState, useEffect } from "react";
import ProductCard from "./components/productCard";
import ProductFilter from "./components/productFilter";

const StorePage = () =>{
    const dispatch = useAppDispatch();
    const allProducts = useAppSelector(state=>state.products.all_products);
    
    useEffect(() =>{
        dispatch(fetchProducts());
    },[])

    return (
        <div className="pt-[15vh] w-screen h-screen text-white font-bold bg-legal flex flex-col justify-center items-center">
            <ProductFilter />            
            <div className="flex justify-center flex-row flex-between-2 p-2 m-2 w-full h-full bg-legal">
            { 
                allProducts.length === 0 ?
                <h2>Loading...</h2> : 
                allProducts!.map((product: any)=>(
                    <ProductCard product_name={product.product_name} price={product.price} image={product.photo}/>
                ))
            }
            </div>
        </div>
    )    
}

export default StorePage;
