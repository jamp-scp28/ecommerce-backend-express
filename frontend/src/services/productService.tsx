import axios from "axios";

export const getProducts = async () => {
    axios.get(`http://localhost:8081/api/v1/products`)
      .then(res => {
        console.log('response',res)
        return res.data;
    })
}

export default getProducts;