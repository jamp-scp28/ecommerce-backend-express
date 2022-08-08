import express from "express";
import { Router } from "express";
import bParser, { json } from "body-parser";
import logger from "../utils/logger";
import jwt from "jsonwebtoken";
import baseClass from "../database/baseClass";
import encryptPass from "../utils/encryptPass";
import bcrypt from "bcrypt";
import {transporter, UserRegistration, sendMail} from "../utils/mailConfig";


const userDB = new baseClass();
const jsonParser = bParser();
const auth = Router();

const genToken = (id: number, email: string, role: string) => {
  return jwt.sign({
    iss: 'jamp-ecommerce',
    sub: id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
    uil: email,
    role: role
  }, process.env.SECRET_KEY!);
}

auth.post('/login', async function (req: express.Request, res: express.Response) {
    const {email, password} = req.body;
    console.log(email, password);
    const sql_statement = "select u.username, u.id, u.email, ur.role, password from users u left join user_roles ur on u.id = ur.user_id where u.email = $1;"

    await userDB.executeQuery(sql_statement, [email], (userData: any)=>{
        if(userData && userData.length > 0 && password){
            console.log('cryppass', password);
            console.log('users',userData[0].password);
            bcrypt.compare(password, userData[0].password, (err: any, isValid: boolean)=>{

                if(err){
                    return res.status(403).json({error: err});
                }

                if(isValid){
                    const token = genToken(userData[0].id, userData[0].email, userData[0].role);
                    console.log('returning user:', token)
                    return res.status(200).json({userEmail: userData[0].email, token: token});
                }
            })
        }else{
            return res.status(403).json({ error: 'Could not login.'});
        }
    })
});

auth.post('/register', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const { username, email, password, fullname, address, age, phone_number_prefix, phone_number, avatar } = req.body;
   
    const sql_statement = "select email from users where email = $1;"

    const sql_statement_createuser = "select * from createUser($1, $2, $3, $4, $5, $6, $7, $8, $9);"

    await userDB.executeQuery(sql_statement, [email], (userEmail: any)=>{

        if(userEmail && userEmail.length > 0){
            return res.status(403).json({ error: 'Email is already in use'});
        }else{
            userDB.executeQuery(sql_statement_createuser,[username, email, encryptPass(password), fullname, address, age, phone_number_prefix, phone_number, avatar], (data: any)=>{
              logger.info(data);
              const newUser = data;
              const token = genToken(newUser, email, 'user');
              res.status(200).json({token});
            })
            // Send email to user
            const mailResponse = sendMail(UserRegistration);
            logger.info(mailResponse)
        }
    })
});


auth.get('/logout', (req, res) => {
    req.session.destroy( error => {
        if (error) {
            res.send({status: 'Logout Error', body: error})
        }
    })
    logger.warn('user logged out...')
    res.send('User logged out')
})

export default auth;