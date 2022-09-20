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
<<<<<<< HEAD
        <div className="pt-[15%] w-screen h-screen text-white font-bold bg-teal-400 flex flex-col justify-center items-center">
            <ProductFilter />
            <div className="container px-6 mx-auto my-24">
                <section className="mb-32 text-center text-gray-800 lg:text-left">
                    <h2 className="mb-12 text-3xl font-bold text-center text-white">Explora nuestros productos.</h2>
                    <div className="grid lg:grid-cols-3 gap-x-6">
                        {
                            allProducts.length === 0 ?
                            <h2 className="text-white">Loading...</h2>
                            :
                            allProducts.map((product)=>{
                                return <ProductCard key={product.id} product_name={product.product_name} price={product.price} image={product.photo} product_id={product.id} />
                            })
                        } 
                    </div>
                </section>
=======
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
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
            </div>
        </div>
    )    
}

export default StorePage;
