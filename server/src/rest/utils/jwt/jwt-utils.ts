import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function genToken(id: number, email: string, role: string){
    return jwt.sign({
      iss: 'jamp-ecommerce',
      sub: id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
      uil: email,
      role: role
    }, process.env.SECRET_KEY!);
}

export async function validateUser(password: string, userData: any){
    if(userData && password){
        const validateResponse = await bcrypt.compare(password, userData.password);
        console.log('val', validateResponse)
        if(validateResponse){
            const token = genToken(userData.id, userData.email, userData.role);
            return {userEmail: userData.email, token: token};
        }
    }
    return { error: 'Could not login.'};
}