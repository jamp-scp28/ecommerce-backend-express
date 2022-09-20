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
    if(userData && userData.length > 0 && password){
        const validateResponse = await bcrypt.compare(password, userData[0].password);
        if(validateResponse){
            const token = genToken(userData[0].id, userData[0].email, userData[0].role);
            return {userEmail: userData[0].email, token: token};
        }else{
            return { error: 'Could not login.'};
        }
    }else{
        return { error: 'Could not login.'};
    }
}