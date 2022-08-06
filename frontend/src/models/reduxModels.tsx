export interface ProductModel {
    "created_date": string,
    "id": number,
    "product_name": string,
    "description": string,
    "code": string,
    "price": number,
    "photo": string
}

export interface ProductArrayModel{
    all_products: ProductModel[],
    product: ProductModel
}


export interface UserModel {
    "id": number,
    "username": string,
    "email": string,
    "password": string,
    "fullname": string,
    "address": string,
    "age": number,
    "phone_number_prefix": string,
    "phone_number": number,
    "avatar": string
}

export interface UsersArray{
    all_users: UserModel[],
    user: UserModel
}