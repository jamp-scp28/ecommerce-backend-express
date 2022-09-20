import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchUserCartProducts } from "../../redux/actions/product-action";

const CartPage = () => {

  const dispatch = useAppDispatch();
    const userProductsCart = useAppSelector(state=>state.products.user_products_cart);

    useEffect(()=>{
      dispatch(fetchUserCartProducts());
    },[])
  

return (
<div className="w-screen pt-4 pb-4 pl-4 pr-4 bg-blue">
  <div className="bg-white rounded-lg sm:py-16 lg:py-10 py-4 mt-[10%]">
  {
    userProductsCart.map((data: any)=>{
      return <div key={data.id} className="w-screen h-12 bg-blue">{data.product_name}</div>
    })
  }
    <div className="px-4 py-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="max-w-6xl mx-auto">
        <p className="mb-8 text-4xl font-bold text-center text-gray-900">Mi Carrito</p>
        <div className="grid grid-cols-1 lg:grid-cols-6 lg:items-start xl:gap-x-8 lg:gap-x-6 gap-y-10">
          <div className="lg:col-span-3 xl:col-span-4">
            <div className="flex mb-6 ml-0">
              <p className="text-sm font-medium text-gray-500">Los productos son reservados por 60 minutos.</p>
            </div>
            <div className="flow-root pt-4 pb-4 pl-8 pr-8 rounded shadow-lg">
              <div className="my-2 divide-y divide-gray-200">
                <div className="flex py-7">
                  <div className="flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=781&amp;q=80" className="object-cover w-16 h-16 rounded-lg" alt=""/>
                  </div>
                  <div className="flex-1 ml-5">
                    <div className="flex flex-wrap items-center justify-between w-full">
                      <div className="sm:pr-5 pr-9 ">
                        <p className="text-base font-bold text-gray-900">Apple Iphone 11</p>
                        <p className="font-medium text-sm mt-1.5 text-gray-500">Golden</p>
                      </div>
                      <div className="flex items-center my-4 sm:my-0">
                        <div className="flex flex-col ml-0 mr-6">
                          <p className="mb-2 text-sm font-medium text-gray-500">Size</p>
                          <select className="block w-20 py-2 pl-4 pr-8 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" >
                            <option >A regular sized select input</option>
                            <option >Another option</option>
                            <option >And one more</option>
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <p className="mb-2 text-sm font-medium text-gray-500">Quantity</p>
                          <select className="block w-20 py-2 pl-4 pr-8 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900">
                            <option >A regular sized select input</option>
                            <option >Another option</option>
                            <option >And one more</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-6 text-base font-bold text-gray-900">$259.00</p>
                        <button className="pt-1 pb-1 pl-2 pr-2 text-sm bg-gray-700 border border-gray-400 rounded-lg text-gray-50" >Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex py-7">
                  <div className="flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80" className="object-cover w-16 h-16 rounded-lg" alt=""/>
                  </div>
                  <div className="flex-1 ml-5">
                    <div className="flex flex-wrap items-center justify-between w-full">
                      <div className="sm:pr-5 pr-9 ">
                        <p className="text-base font-bold text-gray-900">Macbook Pro</p>
                        <p className="font-medium text-sm mt-1.5 text-gray-500">Golden</p>
                      </div>
                      <div className="flex items-center my-4 sm:my-0">
                        <div className="flex flex-col ml-0 mr-6">
                          <p className="mb-2 text-sm font-medium text-gray-500">Size</p>
                          <select className="block w-20 py-2 pl-4 pr-8 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" >
                            <option >A regular sized select input</option>
                            <option >Another option</option>
                            <option >And one more</option>
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <p className="mb-2 text-sm font-medium text-gray-500">Quantity</p>
                          <select className="block w-20 py-2 pl-4 pr-8 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" >
                            <option >A regular sized select input</option>
                            <option >Another option</option>
                            <option >And one more</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-6 text-base font-bold text-gray-900">$99.00</p>
                        <button className="pt-1 pb-1 pl-2 pr-2 text-sm bg-gray-700 border border-gray-400 rounded-lg text-gray-50" >Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:sticky lg:top-6 lg:mt-10">
            <div className="overflow-hidden bg-gray-800 rounded text-gray-50">
              <div className="px-4 py-6 sm:p-6 lg:p-8">
                <div>
                  <div className="mb-4 ml-0">
                    <div className="flex items-center justify-between py-5 border-b-2">
                      <p className="text-lg font-bold capitalize text-gray-50">TOTAL</p>
                      <p className="text-base font-medium text-right text-gray-50">$589</p>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <p className="text-base font-medium text-gray-50">Subtotal</p>
                      <p className="text-base font-medium text-right text-gray-50">$0</p>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <p className="text-base font-medium text-gray-50">Delivery</p>
                      <p className="text-base font-medium text-right text-gray-50">$10</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <button className="inline-flex items-center justify-center w-full py-4 text-sm font-bold text-center text-gray-900 capitalize transition-all duration-200 border border-transparent rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-400" >CHECKOUT</button>
                </div>
                <p className="mt-4 text-lg font-bold capitalize">WE ACCEPT:</p>
                <div className="flex items-center justify-center my-4">
                  <img src="https://www.mastercard.com.ng/content/dam/mccom/global/logos/logo-mastercard-mobile.svg"
                      className="object-contain w-12 h-6"/>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Verve_Image.png" className="object-contain w-12 h-6"/>
                  <img src="https://visacards.africa/static/generic/Logo.png" className="object-contain w-12 h-6"/>
                </div>
                <p className="text-sm text-gray-50">Got a discount code? Add it in the next step.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default CartPage;