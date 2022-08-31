import { buildSchema } from "graphql";

export const graphqlSchema = buildSchema(`
    type Mutation {
        createProduct(product_name: String, description: String, code: String, stock: Int, price: Int, photo: String): Product
    },
    type Query {
        getProducts(optional: String): [Product]
    },
    type Product {
        id: Int 
        product_name: String
        description: String
        code: String
        stock: Int
        price: Int
        photo: String
    }
`);