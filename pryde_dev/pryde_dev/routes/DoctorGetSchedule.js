const express=require('express');
const router=express.Router();
const con=require('../database_connection/mongoConnection').con();
var TokenHelper=require('../UtilityClasses/TokenHelper');

/**
 *   REST API TO GET THE DOCTOR's SCHEDULE
 **/


router.get('/',(req,res)=>{
    //console.log(req.cookies['csrf']);
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
        
                    const criteria={
                        email: req.cookies['email']
                    }
                    console.log("GetSchedule Criteria");
                    con.then((db)=>{
                        console.log("**********running***********")
                            db.collection('DoctorCalendar').find(criteria).toArray((err,array)=>{
                            res.send({schedule:array,new_csrf:new_csrf});
                        
                        })
                    
                        })
                        con.catch(()=>{
                            console.log("error")
                        })

             }
         })           
});
module.exports=router;


