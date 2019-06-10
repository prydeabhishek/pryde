module.exports={
    verify:(db,req,res)=>{
        let mobile_verified=false;
        db.collection('DoctorProfile').findOne({user_id:req.body.user_id},(err,result)=>{
            //console.log("Result is:"+JSON.stringify(result));
            if(err){
                console.log("Error Occured "+err)
            }
            mobile_otp=result.mobile_verification_code;
            if(mobile_otp.localeCompare(req.body.verify_mobile_otp)===0)
            {
                console.log("if excuetd");
                mobile_verified=true;
                console.log("Mobile Verified: "+mobile_verified);
                return mobile_verified;
            }
            else{
                console.log("else Executed");
                 return mobile_verified=false;
            }
            
        })
    }
}