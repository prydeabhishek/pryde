var nodeMailer = require('nodemailer');

 let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'theabhishekku140194@gmail.com',
        pass: 'Abhishek@1401'
    }
});


 module.exports={
       send_email:(user)=>{
           console.log("INSIDE SENDEMAIL1:"+JSON.stringify(user));
        let mailOptions = {
            from: '"Pryde Healthcare" <xx@gmail.com>', // sender address
             to: user.email, // list of receivers
             subject: "Activate Account", // Subject line
             text: `Congratulations ${user.first_name} Your account is activated `, // plain text body
             html: 'Hello<strong>' +user.first_name+ '</strong>,<br><br> <a href="http://localhost:3001/verify/'+user.email_verification_code +'">ACTIVATE </a>'
            };  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            return console.log(error);
            }
          })
      }
    }
