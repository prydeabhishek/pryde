module.exports= function(db,req){
        // this.mobile_verified=true;
        db.collection('DoctorProfile').findOne({user_id:req.body.user_id},(err,result)=>{
            //console.log("Result is:"+JSON.stringify(result));
            if(err){
                console.log("Error Occured "+err)
            }
            else{
            mobile_otp=result.mobile_verification_code;
            if(mobile_otp.localeCompare(req.body.verify_mobile_otp)===0)
            {
                console.log("if excuetd");
                      this.mobile_verified=true;
                    return this.mobile_verified;
              //  console.log("Mobile Verified: "+mobile_verified);
              //  return mobile_verified;
            }
            else{
                console.log("else Executed");
                this.mobile_verified=false;
                return this.mobile_verified;
            }
        }
        })
        console.log("Mobile Verified: "+this.mobile_verified); 
        return this.mobile_verified
    
    }
