const express=require('express');
const con=require('../database_connection/mongoConnection').con();
const uuid = require('uuid');

module.exports={
    validate:(csrf_token,auth_token)=>{
        console.log('csrf is '+csrf_token);
        console.log('auth is '+auth_token);
        //var result = 'false';
        var result={
            resu:'false'
        }
        con.then((db)=>{
          
            const criteria={                 
                auth_token : auth_token,
                expired : false
            }
            const doctor_session_criteria={                 
                auth_token : auth_token
             }
          //  console.log('before check authToken'+JSON.stringify(criteria));
            var cursor = db.collection('DoctorSession').find(criteria);
            var count=0;
            cursor.each
            ((err,docs)=>{
                console.log("COUNTER "+ ++count);
              console.log('new docs'+docs);
              console.log("docs");
              console.log(docs);
           console.log("return value is "+ result.resu);
           if(result.resu!='false'){
               console.log("not looping again");
               return;
           }
           if(docs!=null){
           //assert.equal(1, docs.length);
           console.log('Inside Find');
           console.log(docs.csrf_token);
           console.log(docs.auth_token);
               if(!docs.expired){
                   console.log("assigning csrf db "+docs.csrf_token);
                   const csrf_token_db =  docs.csrf_token;
                   console.log("before if");
                   console.log("csrf _db " + csrf_token_db);
                   console.log("csrf " + csrf_token);
                   if(csrf_token_db === csrf_token){
                       var new_csrf_token = uuid.v4();
                       console.log("new csrf "+ new_csrf_token);
                       var upsert = {'$set':{"csrf_token":new_csrf_token}};
                       
                       result.resu =  new_csrf_token; 
                       console.log("result is "+ result.resu)
                       
                       var upsert_result = db.collection('DoctorSession').updateOne(criteria, upsert);
                     //  function UpdateProfile() 
                      // {   
                             console.log("***********INSIDE UPDATEPROFILE*********");
                            db.collection('DoctorProfile').updateOne(doctor_session_criteria,upsert,(err,result)=>{
                                if(err){
                                   // res.send({status:"Update Fail", error:err})
                                   console.log("Error Occured in updateDoctorProfile")
                                }    //err-end
                                else{
                                 
                               // res.send({status:"Update Success"});
                               console.log("updateDoctorProfile Success");
                               console.log("updateResult:"+result);
                                }   //else-end);
                            })
                        //}
                   }
               }          
           db.close();
          // res.send(result.resu);           
           console.log('result.res is '+result.resu);
          // return result.resu;  //20 may
          return callback(result.resu)
           } 
            });
               //cursor.each((err, docs) =>{     })
         //******con then end*****/    
        });
        return callback(result.resu);  
        
    }
}