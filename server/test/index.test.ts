import { expect } from "chai";
import axios from "axios";

const apiEndpoint: String = "http://localhost:8081/api/v1";

describe('GET request', async () => {
   it('Should retrieve a list of products', (done)=>{
        axios.get(`${apiEndpoint}/products`).then((response)=>{
           expect(response.status).to.equal(200);
        });
        done();
   }) 
})

describe('POST',async () => {
   it('Should save a product', (done)=> {
      axios.post(`${apiEndpoint}/products/create`, {
         product_name: "laptop",
         description: "intel",
         code: "AB2",
         stock: 100,
         price: 2000,
         photo: "image.png"
      }).then((response)=>{
         expect(response.status).to.equal(200);
      })
      done();
   })
})

describe('GET BY ID',async () => {
  it('Should return a product by its id', (done)=>{
      axios.get(`${apiEndpoint}/products/1`).then((response)=>{
         expect(response.status).to.equal(200);
         expect(response.data).to.have.property('id').to.be.equal(1);
      })
      done();
  }) 
})

describe('UPDATE',async () => {
  it('Should update a product', (done)=>{
      axios.put(`${apiEndpoint}/update/1`,{
         product_name: "laptop 2.0",
         description: "intel",
         code: "AB2",
         stock: 100,
         price: 2000,
         photo: "image.png"
      }).then((response)=>{
         expect(response.status).to.equal(200);
         expect(response.data).to.have.property('id').to.be.equal(1);
      })
      done();
  }) 
})

describe('DELETE',async () => {
  it('Should delete a product', (done)=>{
      axios.delete(`${apiEndpoint}/1`).then((response)=>{
         expect(response.status).to.equal(200);
      })
      done();
  }) 
})