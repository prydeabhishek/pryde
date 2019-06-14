const express=require('express');
const router=express.Router();
const con=require('../database_connection/mongoConnection').con();
router.post('/',(req,res)=>{
     
      let email=req.body.email;
      console.log('EMAIL:'+email)
    con.then((db)=>{
        db.collection('DoctorProfile').findOne({ email }).then(user => {
            // Check if user exists
            if (!user) {
            return res.json({ status: "Email not found" });
            }
            console.log(JSON.stringify(user));
            return res.json({ status:'success',user:user });
            //if(user.active)
            
           
        });
    }).catch(err=>
        console.log("ERROR OCCURED WHILE CONNECTING TO MONGO IN FORGOTPASSWORD :"+JSON.stringify(err)))
})


module.exports=router;