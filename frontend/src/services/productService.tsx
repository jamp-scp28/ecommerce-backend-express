import axios from "axios";
import { useAppSelector } from "../redux/hooks/hooks";

export const getProducts = async () => {
    axios.get(`http://localhost:8081/api/v1/products`)
      .then(res => {
        console.log('response',res)
        return res.data;
    })
}

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
