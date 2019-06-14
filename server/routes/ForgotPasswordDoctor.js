const express=require('express');
const router=express.Router();
const crypto=require('crypto');
const con=require('../database_connection/mongoConnection').con();
var nodeMailer = require('nodemailer');
router.post('/',(req,res,next)=>{
      
      let email=req.body.email;
      if(email === ''){
          res.json('email required')
      }
      console.log('EMAIL:'+email)
    con.then((db)=>{
        db.collection('DoctorProfile').findOne({ email }).then(user => {
            // Check if user exists
            if (!user) {
            return res.json('email not in db');
            }
            else{
                const token=crypto.randomBytes(20).toString('hex');
                console.log("token:"+token);
               db.collection('DoctorProfile').updateOne({email},{$push:{resetPassworkToken:token,
                resetPasswordExpires:Date.now()+360000}},(err,result)=>{
                  if(err){
                      console.log('Error occured while inserting password reset Token')
                  }
               })
              //  user.updateOne();

                          let transporter = nodeMailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: 'theabhishekku140194@gmail.com',
                                pass: 'Abhishek@1401'
                            }
                        });
                        
                        let mailOptions = {
                            from: '"Pryde Healthcare" <xx@gmail.com>', // sender address
                             to: `${user.email}`, // list of receivers
                             subject: "Reset Password", // Subject line
                             text: `Password Reset Mail ` , // plain text body
                             html: 'Hello<strong>' +user.first_name+ '</strong>,<br><br> <a href="http://localhost:3001/reset/'+token +'">RESET PASSWORD </a>'
                            };  
                         
                            transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                            return console.log(error);
                            }
                            else{
                                res.status(200).json('recovery email sent')
                            }
                          })
                





             
          //  return res.json({ status:'success',user:user });
            //if(user.active)
           }
           
        });
    }).catch(err=>
        console.log("ERROR OCCURED WHILE CONNECTING TO MONGO IN FORGOTPASSWORD :"+JSON.stringify(err)))
})


module.exports=router;