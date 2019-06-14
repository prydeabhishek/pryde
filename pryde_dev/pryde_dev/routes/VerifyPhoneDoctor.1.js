
const express=require('express');
const router=express.Router();
const con=require('../database_connection/mongoConnection').con();
var TokenHelper=require('../UtilityClasses/TokenHelper');

/**
 *   REST API TO VERIFY THE DOCTOR's MOBILE NUMBER
 **/


router.post('/',(req,res)=>{
    
     //FUNCTION TO VALIDATE AND UPDATE THE TOKENS  
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
                var newvalues={};
                var mobile_verified="rocks";
                var mobile_otp;
                var email=req.cookies['email'];
                db.collection('DoctorProfile').findOne({email},(err,result)=>{
                //  console.log("Result is:"+JSON.stringify(result));
                
                    if(err){
                        console.log("Error Occured "+err)
                    }
                    else{
                    
                            mobile_otp=result.mobile_verification_code;
                            if(mobile_otp.localeCompare(req.body.verify_mobile_otp)===0)
                            {
                               
                                    mobile_verified=true;
                                    callbackStep();
                            }
                            else{
                                mobile_verified=false;
                                callbackStep();
                            }
                    
                        }//db else end
                }); //(err,result) callback end

            
                function callbackStep(){
                // console.log("callback Mobile Verified: "+mobile_verified);
                newvalues = 
                    { 
                         $set: {                              
                                mobile_verified:mobile_verified,
                                mobile_verification_date:new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"})
                                }
                    };

                  //updatePasswarodStatus();
                  updateVerificationStatus();   
                }//CallbackStep() end
       
                function updateVerificationStatus(){
                //console.log("*******Connected To DB************");
               // console.log("New Values :"+JSON.stringify(newvalues));
                db.collection('DoctorProfile').update({user_id:req.body.user_id},newvalues,(err,result)=>{
                    if(err){
                        res.send({status:"Update Fail",error:err})
                    }    //err-end
                    else{
                      res.send({mobile_verified:mobile_verified
                                 ,new_csrf_token:new_csrf });
                     }   //else-end
                  })   //update-end
            
                }//updateVerificationStatus() end 
           
            
                           
       
       })  //con.(db) end
    }//else
     
});    //tokenHelper end
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


