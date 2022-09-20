<<<<<<< HEAD
import { useAppSelector } from "../../../redux/hooks/hooks";
import { addProductToCart } from "../../../services/productService";

const ProductCard = ({product_name, price, image, product_id}: {product_name: string, price: number, image: string, product_id: number}) => {
	const userToken = useAppSelector(state=>state.user.userToken);
	const handleSubmit = () =>{
		addProductToCart(product_id, userToken!);	
		alert('Product added to cart.')
	}

    return (
		<div className="w-full h-full p-5 mb-12 bg-white shadow-2xl rounded-xl lg:mb-0">
			<div className="relative mb-6 overflow-hidden bg-no-repeat bg-cover rounded-lg shadow-lg"
			style={{backgroundPosition: "50%"}} data-mdb-ripple="true" data-mdb-ripple-color="light">
				<img src="https://mdbootstrap.com/img/new/standard/city/041.jpg" className="w-full" />
				<a href="#!">
					<div
					className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden transition duration-300 ease-in-out bg-fixed opacity-0 mask hover:opacity-100"
					style={{backgroundColor: "rgba(251, 251, 251, 0.2)"}}></div>
				</a>
			</div>
			<h5 className="mb-3 text-lg font-bold">{product_name}</h5>
			<div className="flex items-center justify-between">
				<span className="pr-4 text-3xl font-bold text-gray-900 dark:text-white">$ {price}</span>
				<a onClick={handleSubmit}
					className="text-white bg-blue hover:bg-teal-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Comprar
				</a>
			</div>
		</div>
    )
}

=======

const ProductCard = ({product_name, price, image}: {product_name: string, price: number, image: string}) => {

    return (
<div className="max-w-2xl p-2 mx-auto">
	<div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
		<a href="#">
			<img className="rounded-t-lg p-8" src={image} alt="product image"/>
        </a>
			<div className="px-5 pb-5">
				<a href="#">
					<h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                        {product_name}
                    </h3>
				</a>
				<div className="flex items-center mt-2.5 mb-5">
					<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
						</path>
					</svg>
					<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
						</path>
					</svg>
					<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
						</path>
					</svg>
					<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
						</path>
					</svg>
					<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
						</path>
					</svg>
					<span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold text-gray-900 dark:text-white pr-4">$ {price}</span>
					<a href="#"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
						to cart</a>
				</div>
			</div>
        </div>
    </div>
    )
}


>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
export default ProductCard;