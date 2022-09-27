import nodeMailer from "nodemailer";
import { Types } from "../../../types";
console.log('user:',process.env.MAIL_USER)
console.log('pass:',process.env.MAIL_PASS)

export const transporter = nodeMailer.createTransport({
    service: 'gmail',
       auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
         },
    secure: true,
})

export const UserRegistration = (user: Types.User) => {
    return {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: 'Welcome to Jamp Ecommercer',
        text: 'You have created your account sucessfully!',
        html: `<b>Hey there, ${user.fullname} thanks for your suscription!</b>`
    }
}

export const ProductCheckout = {
        from: process.env.MAIL_USER,  // sender address
        to: process.env.MAIL_USER,   // list of receivers
        subject: 'Your order was received.',
        text: 'Congrats!',
        html: `<b>We receive your order! we are going to deliver it asap!</b>`
}

export const sendMail = (emailOptions: any) => {
    transporter.sendMail(emailOptions,(error: any, info: any)=>{
        if(error){
            return error
        } else{
            return info
        }
    })
}