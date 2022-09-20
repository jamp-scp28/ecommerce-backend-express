import axios from "axios";
<<<<<<< HEAD
import { useAppSelector } from "../redux/hooks/hooks";
=======
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005

export const getProducts = async () => {
    axios.get(`http://localhost:8081/api/v1/products`)
      .then(res => {
        console.log('response',res)
        return res.data;
    })
}

<<<<<<< HEAD
export const addProductToCart = async (id: number, token: string) => {
  console.log('userTokenIs', token);
  const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    }
  }

  axios.post(`http://localhost:8081/api/v1/products/addtocart/${id}`,
  {quantity:1},
    config 
  ).then((response)=>{
    console.log('adding to cart...')
  })
}
=======
export default getProducts;
>>>>>>> d0499e5705034c6dd6a2d84094f01ec4e115f005
