const express=require('express');
const router=express.Router();
const con=require('../database_connection/mongoConnection').con();
var TokenHelper=require('../UtilityClasses/TokenHelper');
/**
 *   REST API TO VERIFY THE DOCTOR's  EMAIL ID
 **/


router.post('/',(req,res)=>{
    TokenHelper.verify_tokens(req,res,callback=(response)=>{
        console.log("inside callback,Response: "+JSON.stringify(response));
        var status = response.status;
        if(status==='Failure'){
            // Exit from here
            var response_string = {'status': 'Failure', 'reason': response.reason}
            res.send(response_string)
        }
        else{
                    //Continue your program
                    var new_csrf = response.new_csrf_token;    
          con.then((db)=>{
                
                var email_verification_code="";
                var email_verified="false"
             var newvalues={};
            newvalues = { $set: {  
                email_verified:email_verified,                            
                email_verification_date:new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"})
                } };
            console.log("*******Connected To DB************");
            console.log("New Values :"+JSON.stringify(newvalues));
            db.collection('DoctorProfile').update({user_id:req.body.user_id},newvalues,(err,result)=>{
                      if(err){
                          res.send({status:"Update Fail",
                      error:err})
                      }    //err-end
                      else{
                      res.send({status:"Update Success",
                          new_csrf:new_csrf});
                      }   //else-end
                   })   //update-end
               
               });
            }
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


