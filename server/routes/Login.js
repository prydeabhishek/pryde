//"use strict";
const express=require('express');
const router=express.Router();
const con=require('../database_connection/mongoConnection').con();
const HashPassword=require('../UtilityClasses/HashPassword');
const { check, validationResult } = require('express-validator/check');
const uuid = require('uuid');

/**
 *   Validation array to check for the validation 
 **/
const paramValidate=[                       
                      check('email').not().isEmpty().isEmail(),                    
                      check('password').not().isEmpty().isLength({min:2,max:30})                     
                    ];



router.post('/',paramValidate,(req,res)=>{
    //console.log('****************COOKIE TEST************');
    res.cookie("RESPCOOKIE","HELLOTESTRESPONSE", { maxAge: 900000, httpOnly: true })
    
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
                       return res.status(422).json({ errors: errors.array() });
            }
       
    con.then((db)=>{

        const email = req.body.email;
        const password = req.body.password;

  // Find user by email
        db.collection('DoctorProfile').findOne({ email }).then(user => {
            // Check if user exists
            if (!user) {
            return res.json({ emailnotfound: "Email not found" });
            }
            console.log(JSON.stringify(user))
            //if(user.active)
            if(user.active){
                if(HashPassword.decrypt(user.password)===password){
                    // console.log("User.password :"+ password);
                    // console.log("Decrypt password :"+HashPassword.decrypt(user.password));
                    res.cookie("RESPCOOKIE","HELLOTESTRESPONSE");
                    res.json({
                         success: true,
                         csrf_token:user.csrf_token,
                         auth_token:user.auth_token,
                         email:user.email,
                         user:user 
                     });
                 }
                 else{
                     return res
                     .json({ passwordincorrect: "Password incorrect" });
                 
                 }
            }
            else{
                return res.json({verify_email:"You Need To Verify Your Email First"})
            }
           


       })//then end
    });
});   

module.exports=router;


