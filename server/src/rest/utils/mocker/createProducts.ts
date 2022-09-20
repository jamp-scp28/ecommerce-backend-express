import { faker } from '@faker-js/faker';

export interface Product{
    timestamp: Date
    name: string;
    description: string;
    code: string;
    stock: number;
    price: number;
    photo: string;
}
const createProducts = (qnt: number) => {
    let products: Array<Product> = [];
    for (let i: number = 0; i < qnt;i++){
        let obj: Product = {
            timestamp: new Date(),
            name: faker.commerce.product(),
            description: faker.commerce.product(),
            code: 'DDF34',
            stock: 1000,
            price: parseInt(faker.commerce.price()),
            photo: faker.image.business()
        }
        products.push(obj);        
    }
    return products
}

const generateFakeProducts = async () => {
    let products: Array<Product> = createProducts(10);
    products.forEach((product: Product) => {
    })

    console.log('Products inserted sucessfully...')
}

export default generateFakeProducts;