"use strict";
const express=require('express');
const router=express.Router();
let con=require('../database_connection/mongoConnection').con();

module.exports={
            fetchTokens:(id)=>{
                
                let tokens={}
                con.then(db=>{
                    db.collection('DoctorProfile').findOne({user_id:id},(err,result)=>{
                        
                                                   
                          //  console.log("Auth Token: "+obj.auth_token);
                          //  console.log("Csrf Token: "+obj.csrf_token);
                             tokens= {
                                auth_token:result.auth_token,
                                csrf_token:result.csrf_token
                            }
                        
                       // console.log("Result "+JSON.stringify(result.csrf_token));
                       // console.log("InsideFetchToken :"+JSON.stringify(tokens))
                       return callback(tokens);
                    })
                })
               
            }
}