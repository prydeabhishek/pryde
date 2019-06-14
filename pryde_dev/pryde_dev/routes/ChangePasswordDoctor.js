const express=require('express');
const router=express.Router();
let con=require('../database_connection/mongoConnection').con();
const { check, validationResult } = require('express-validator/check');
const HashPassword=require('../UtilityClasses/HashPassword');
var TokenHelper=require('../UtilityClasses/TokenHelper');
/**
 *   Rest API To change/Update the Password for Doctor
 *   If Password and Confrim Password are Equal then Update The Password
 *   Update Session tokens
 **/

 //---Array for RestFields Validation----
const paramValidate=[ 
                      check('password').not().isEmpty().isLength({min:2,max:80}),
                      check('confirm_password').not().isEmpty().isLength({min:2,max:80}),
                                         
                    ];

//---Post route with rest field validation                     
router.post('/',paramValidate,(req,res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                       return res.status(422).json({ errors: errors.array() });
               }

            //FUNCTION TO VALIDATE AND UPDATE THE TOKENS  
    TokenHelper.verify_tokens(req,res,callback=(response)=>{
        console.log("inside callback,Response: "+JSON.stringify(response));
        var status = response.status;
        if(status==='Failure'){
            // Exit from here
            var response_string = {'status': 'Failure', 'reason': response.reason}
            res.send(response_string)
        }else{
            //Continue your program
            var new_csrf = response.new_csrf_token;
           
         con.then((db)=>{       
                       
            let password=req.body.password;
            let  confirm_password=req.body.confirm_password;
            
            //Checking for both the password to be equal
           let bool_password_equal=password.localeCompare(confirm_password);
           if(bool_password_equal===0){
             //-----Values to be updated-------
                    var newvalues = { $set: {                              
                        password:HashPassword.encrypt(req.body.password),           
                        password_date:new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"})
                        } };
            
                
                    console.log("***Connected To Database*****");  //testing Connection
                    // console.log(csrf());
                    // console.log(JSON.stringify(schema));
                  //  var email=req.cookies['email'];
                  var email=req.headers['email'];
                    console.log(req.body);
                    db.collection('DoctorProfile')
                    .updateOne({email},newvalues,(err,result)=>{
                        if(err){
                            res.send({status:"Update Fail",
                        error:err})
                        }    //err-end
                        else{
                        res.send({status:"Update Success",new_csrf_token:new_csrf});
                        }   //else-end
                     })   //update-end
           }//bool-password end
           else{
            res.send({status:"Password Not Matched"});
           }           
    })  
}   
});  //End of else-case
});

/*
*----------Get Request to see The Documents in The Collection DoctorProfile------                 
*/
router.get('/',(req,res)=>{
    con.then((db)=>{
        console.log("**********Connected To Database***********")
        db.collection('DoctorProfile').find().sort({email:-1}).toArray((err,array)=>{
            res.send(array);
           
        })
    }
        )
        con.catch(()=>{
            console.log("error")
        })
});

module.exports=router;


