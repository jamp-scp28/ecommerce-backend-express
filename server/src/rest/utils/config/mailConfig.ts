import nodeMailer from "nodemailer";
console.log('user:',process.env.MAIL_USER)
console.log('pass:',process.env.MAIL_PASS)

export const transporter = nodeMailer.createTransport({
    service: 'gmail',
       auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
         },
    secure: true,
});

export const UserRegistration = {
    from: process.env.MAIL_USER,  // sender address
      to: process.env.MAIL_USER,   // list of receivers
      subject: 'User Register Sucessfully',
      text: 'You have created your account sucessfully!',
      html: '<b>Congrats! </b>'
};

export const ProductCheckout = {
    from: process.env.MAIL_USER,  // sender address
      to: process.env.MAIL_USER,   // list of receivers
      subject: 'A new order has been issued',
      text: 'Congrats we selled something!',
      html: '<b>Check it out! </b>'
};

export const sendMail = (emailOptions: any) => {
    transporter.sendMail(emailOptions,(error: any, info: any)=>{
        if(error){
            return error
        } else{
            return info
        }
    })
}