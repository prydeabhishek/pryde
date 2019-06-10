"use strict";
const express=require('express');
const router=express.Router();
const con=require('../database_connection/mongoConnection').con();
const HashPassword=require('../UtilityClasses/HashPassword');
const { check, validationResult } = require('express-validator/check');
const uuid = require('uuid');
const TokenValidation =require('../UtilityClasses/TokenValidation');
var MobileValidation=require('../UtilityClasses/MobileValidation.1');
/**
 *   REST API TO VERIFY THE DOCTOR's MOBILE 
 **/


router.post('/',(req,res)=>{
    
    con.then((db)=>{
        var newvalues={};
          
       
       let mobile_verified=new MobileValidation(db,req);            
        //   if(MobileValidation.verify(db,req)){
        //       console.log("testtt")
        //   }
        
        console.log("*#%^#^#");
            setTimeout(()=>{
                console.log("executed after 6s mobile_verified :"+mobile_verified);
                console.log("mobileResult: "+mobile_verified);
            },6000)
           
            newvalues = { $set: {                              
                mobile_verified:mobile_verified,
                mobile_verification_date:new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"})
                } };
            console.log("*******Connected To DB************");
            console.log("New Values :"+JSON.stringify(newvalues));
            db.collection('DoctorProfile').update({user_id:req.body.user_id},newvalues,(err,result)=>{
                      if(err){
                          res.send({status:"Update Fail",
                      error:err})
                      }    //err-end
                      else{
                      res.send({status:"Update Success"});
                      }   //else-end
                   })   //update-end
               
               });
    
});

// ************Testing Purpose Only**************
router.get('/',(req,res)=>{
    con.then((db)=>{
        console.log("**********running***********")
             db.collection('DoctorProfile').find().sort({first_name:-1}).toArray((err,array)=>{
            res.send(array);
           
        })
    
    }
        )
        con.catch(()=>{
            console.log("error")
        })
});

module.exports=router;


