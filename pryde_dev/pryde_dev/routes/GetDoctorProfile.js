// db.collection('DoctorProfile').findOne({ email: req.body.email }).then(user => {
//     if (user) {
//       return res.status(400).json({ email: "Email already exists" });
//     }
//  else {

//  }

const express=require('express');
const router=express.Router();
let con=require('../database_connection/mongoConnection').con();
const { check, validationResult } = require('express-validator/check');

var TokenHelper=require('../UtilityClasses/TokenHelper');



router.get('/',(req,res)=>{

   TokenHelper.verify_tokens(req,res,callback=(response)=>
    { 
       // console.log("inside callback,Response: "+JSON.stringify(response));
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
          //  var ValidataionResult={};
            con.then((db)=>{
        
           // console.log(req.body); //testing           
           var email=req.headers['email'];
           //console.log("REQUEST OBJECT PROFILE DOCTOR "+JSON.stringify(req.body));
           
           db.collection('DoctorProfile').findOne({ email }).then(user => {
            if (user) {
              return  res.send({'status':user, 'new_csrf_token': new_csrf })
            }
           else {           
            return  res.send({'status':'Something Went Wrong', 'new_csrf_token': new_csrf })
        
            }
            });
    }) //con-db end   

} //then else
});
});


module.exports=router;


