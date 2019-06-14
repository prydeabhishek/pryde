const express=require('express');
const router=express.Router();
const con=require('../database_connection/mongoConnection').con();
var TokenHelper=require('../UtilityClasses/TokenHelper');
/**
 *   REST API TO SET THE DOCTOR's SCHEDULE
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
                    var email=req.cookies['email'];
                    let count=0;
                con.then((db)=>{
                     
                    db.collection('DoctorCalendar').find({email}).toArray((err,array)=>{
                        // res.send("SCHEDULE "+array);    

                        console.log("SCHEDULE "+JSON.stringify(array)) 
                        if(array.length>0){
                            const obj={   $set:{
                                ["datetime"+new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"})]:req.body.datetime,
                                ["details"+new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"})]:req.body.details
                            } }   
                            db.collection('DoctorCalendar').updateOne({email},obj,(err,result)=>{
                                if(err){
                                    res.send({'status':"Failure",'reason':'DB Failure'})
                                }
                                else{
                                    res.send({'status':'Success ProfileDoctor', 'new_csrf_token': new_csrf })
                            }
                            })
    
                        } //end of if array.length>0
                        else{
                            const obj={ 
                                email,
                                ["datetime_"+new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"})]:req.body.datetime,
                                ["details_"+new Date().toLocaleString('en-US', {timeZone: "Asia/Kolkata"})]:req.body.details
                            }  
                            db.collection('DoctorCalendar').insertOne(obj,(err,result)=>{
                                if(err){
                                    res.send({status:'Sorry Something Went Wrong',error:err})
                                }
                                else{                               
                                    res.send({status:'Schedule Set',result:result});
                                   
                                  }
                             });
                        }             
                    })
                        
                       
             });
        } //TokenElse
    })//TokenValidatorEnd
})
// ************Testing Purpose Only**************
router.get('/',(req,res)=>{
    con.then((db)=>{
        console.log("**********running***********")
        var email=req.cookies['email'];
             db.collection('DoctorCalendar').find({email}).toArray((err,array)=>{
            res.send(array);
           
        })
    
    }
        )
        con.catch(()=>{
            console.log("error")
        })
});

module.exports=router;


