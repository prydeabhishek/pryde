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
        let mailOptions = {
            from: '"Pryde Healthcare" <xx@gmail.com>', // sender address
             to: user.email, // list of receivers
             subject: "Account Activated", // Subject line
             text: `Congratulations ${user.first_name} Your account is activated `, // plain text body
             html: `Congratulations <strong>${user.first_name}</strong> Your account is activated `
            };  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            return console.log(error);
            }
          })
      }
    }
