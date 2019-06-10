const express=require('express');
const router=express.Router();
const con=require('../database_connection/mongoConnection').con();

/**
 *   REST API TO SET THE DOCTOR's SCHEDULE
 **/


router.post('/',(req,res)=>{
    
    con.then((db)=>{
                
             const obj={
                medicines:req.body.medicines,
                lab_tests:req.body.lab_tests,
                diet:req.body.diet,
                instructions:req.body.instructions,
                patient_id:req.body.patient_id,
                follow_up_date:req.body.follow_up_date
                }   
            console.log("*******Connected To DB************");
            console.log("New Values :"+JSON.stringify(obj));
            db.collection('DoctorPatient').insertOne(obj,(err,result1)=>{
                if(err){
                    res.send({insert:'fail',error:err})
                }
                else{
                    res.send({insert:'success'});
                    console.log("Valid Data");
                }
             });
    
});

})
// ************Testing Purpose Only**************
router.get('/',(req,res)=>{
    con.then((db)=>{
        console.log("**********running***********")
             db.collection('DoctorPatient').find().toArray((err,array)=>{
            res.send(array);
           
        })
    
    }
        )
        con.catch(()=>{
            console.log("error")
        })
});

module.exports=router;


