const express=require('express');
const router=express.Router();
let con=require('../database_connection/mongoConnection').con();
const { check, validationResult } = require('express-validator/check');

var TokenHelper=require('../UtilityClasses/TokenHelper');

/**
 *   Validation array to check for the validation 
 **/
const paramValidate=[  check('last_name').isAlpha().isLength({min:2,max:50}),
                       check('mobile').not().isEmpty().isMobilePhone('en-IN'),
                      check('mci_reg_no').isLength({min:2,max:20}),
                      check('specialization').not().isEmpty(),
                      check('education').not().isEmpty(),
                      check('work_experience').not().isEmpty()
                    ];

router.post('/',(req,res)=>{

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //            return res.status(422).json({ errors: errors.array() });
    // }
    console.log("PROFILE DOCTOR COOKIES"+req.cookies.RESPCOOKIE);
    TokenHelper.verify_tokens(req,res,callback=(response)=>
    {
        console.log("inside callback,Response: "+JSON.stringify(response));
        var status = response.status;
        if(status==='Failure'){
            // Exit from here
            var response_string = {'status': 'Failure', 'reason': response.reason}
            res.send(response_string)
        }else{
            //Continue your program
            var new_csrf = response.new_csrf_token;
                
                    //----If Validataion Fails
                    // const errors = validationResult(req);
                    // if (!errors.isEmpty()) {
                    //            return res.status(422).json({ errors: errors.array() });
                    //    }
            //If  Validation Succes   
            var ValidataionResult={};
            con.then((db)=>{
        
           // console.log(req.body); //testing           
           var email=req.headers['email'];
           console.log("REQUEST OBJECT PROFILE DOCTOR "+JSON.stringify(req.body));
           
           let newvalues = { $set: {
                                     ...req.body, 
                                    password_date:new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"}),
                                    mobile_verification_code:"12345678",
                                    mobile_verified:false,
                            }}
            // let newvalues = { $set: { 
               
            //     last_name: req.body.last_name,
            //     mobile: req.body.mobile,
            //     mobile_verification_code:"12345678",
            //     mobile_verified:false,
            //     clinic_phone_no:req.body.clinic_phone_no,
            //     user_id:req.body.user_id,
            //     mci_reg_no:req.body.mci_reg_no,
            //     super_specialization:req.body.super_specialization,
            //     specialization:req.body.specialization,
            //     education:req.body.education,
            //     work_experience:req.body.work_experience,
            //     visiting_faculty:req.body.visiting_faculty,
            //     tags:req.body.tags,
            //     awards:req.body.awards,
            //     achievements:req.body.achievements,
            //     password_date:new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"})
            // } };


            console.log("**********Connected To Database***********");
           
                      
                        db.collection('DoctorProfile')
                        .updateOne({email},newvalues,(err,result)=>{
                            if(err){
                                res.send({'status':"Failure",                          'reason':'DB Failure'})
                            }
                            else{
                                //res.send({'status':'Success ProfileDoctor', 'new_csrf_token': new_csrf })
                                res.send({'status':'Success ProfileDoctor', 'new_csrf_token': new_csrf })
                        }
                        })
                        
              })  
     
            }
         
        });
    
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


