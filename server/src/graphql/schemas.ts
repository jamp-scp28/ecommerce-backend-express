import { buildSchema } from "graphql";

export const graphqlSchema = buildSchema(`
    input ProductInput {
        product_name: String
        description: String
        code: String
        stock: Int
        price: Int
        photo: String
    }
    
    type Product {
        id: Int 
        product_name: String
        description: String
        code: String
        stock: Int
        price: Int
        photo: String
    }

    type Response {
        message: String
    }

    type Mutation {
        createProduct(product: ProductInput): Product
        updateProduct(id: Int!, product: ProductInput): Product
        deleteProduct(productId: Int): Product
    }

    type Query {
        getProducts(optional: String): [Product]

        getProductById(id: Int!): Response 
    }

`);


/* Example of graphqli call

mutation {
  createProduct(product: {
    product_name: "tv"
    description: "a tv"
    code: "FDSAF"
    stock: 100
    price: 1000
    photo: "img.jpg"
  }){
    id
  }
}

query{
  getProductById(id: 2){
    id
    product_name
  }
}

*/