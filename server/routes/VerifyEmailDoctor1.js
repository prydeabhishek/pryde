var Express=require('express');
var router=Express.Router();
var nodeMailer = require('nodemailer');
const con=require('../database_connection/mongoConnection').con();
const sendMail=require('../UtilityClasses/SendEmail').send_email;
var jwt = require('jsonwebtoken');
router.put("/:token", (req, res) => {
     console.log("INSIDE VERIFYEMAILDOCTOR1");
    con.then((db)=>{ 
   
        db.collection('DoctorProfile').findOne({ email_verification_code: req.params.token }).then( (user) => 
        {
            console.log("VERIFYEMAILDOCTOR USER :"+JSON.stringify(user))
            

   // User.findOne({ email_verification_code: req.params.token }, (err, user) => {
   console.log("VERIFYEMAILDOCTOR TOKEN:"+req.params.token)
   const token = req.params.token; // Save the token from URL for verification
    //console.log("the token is", token);
    // Function to verify the user's token
    jwt.verify(token, 'shhhhh', (err, decoded) => {
        if (err) {
        res.json({ success: false, message: "Activation link has expired." }); // Token is expired
        } else if (!user) 
        {
        res.json({ success: false, message: "Activation link has expired." }); // Token may be valid but does not match any user in the database
        } 
        else {
              var object={ 
                        $set:{
                               email_verification_code : false, // Remove temporary token
                               active : true // Change account status to Activated
                             }
                        }
    //user.email_verification_code = false; // Remove temporary token
   // user.active = true; // Change account status to Activated
    // Mongoose Method to save user into the database
    
                      db.collection('DoctorProfile').updateOne({ email_verification_code: req.params.token },object,(err,result)=>
                 {
        
                     if (err) {
                           console.log("unable to save user"+ err); // If unable to save user, log error info to console/terminal
                      } else 
                      {
                        
            // If save succeeds, send email to the user
              sendMail(user);
          
                res.json({
                succeed: true,
                message: "User has been successfully activated"
                });
             }//update else
           });//update close
         }//jwt verify else close
      }); //jwt verify close
    }).catch(err=>{
      res.send({Login:err})
    });
    });// db.findone end
});




 module.exports=router;