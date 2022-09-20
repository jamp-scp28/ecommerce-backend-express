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

export default ProductCard;