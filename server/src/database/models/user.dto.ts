export interface UserDTO {
    id: number;
    username: string;
    email: string;
    password: string;
    fullname?: string;
    address?: string;
    age?: number;
    phone_number_prefix?: string;
    phone_number?: number;
    avatar?: string;
    role?: string;
}