const express=require('express');
const router=express.Router();
const con=require('../database_connection/mongoConnection').con();
const HashPassword=require('../UtilityClasses/HashPassword');
const SecurityHelper=require('../UtilityClasses/SecurityHelper');
const { check, validationResult } = require('express-validator/check');
const uuid = require('uuid');
const TokenValidation =require('../UtilityClasses/TokenValidation');
router.get('/',(req,res)=>{
    const csrf_token = req.query.csrf_token;
    const auth_token = req.query.auth_token;
   let recieved= TokenValidation.validate(csrf_token,auth_token,res,callback=(value)=>{
            console.log("VALUEcallBack :"+value);
           // res.send({new_csrf_token:value});
   });
    console.log("Reciveed Token: "+recieved);
});

module.exports=router;


