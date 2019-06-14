let con=require('../database_connection/mongoConnection').con();
const uuid = require('uuid');
var id;
module.exports ={
   verify_tokens: verify_tokens,
   test: test
}

//function verify_tokens(req, res,auth_token,csrf_token){
    function verify_tokens(req, res){
     console.log("TokenHelper verify_token_running");
    
    // let csrf_from_req = req.cookies['csrf_token'];
    // let auth_from_req = req.cookies['auth_token'];
    console.log("REQUEST HEADERS: "+JSON.stringify(req.headers))
    let csrf_from_req = req.headers.csrf_token;
    let auth_from_req = req.headers['auth_token'];
    id=req.headers['email'];
    
    
    
                
        let tokens={};
       
        let status="",reason="",new_csrf_token="";
        con.then(db=>{
            
            db.collection('DoctorProfile').findOne({email:id},(err,result)=>{
                console.log("TokenHelper Result: "+result);
                //console.log("TokenHelper Result:"+JSON.stringify(result));    
            auth_token = result.auth_token,
            csrf_token = result.csrf_token
            if(auth_token===auth_from_req && csrf_token===csrf_from_req){
                // Tokens Verified, Create new CSRF and Save to DB
                var new_csrf_token = uuid.v4();
                console.log("new csrf "+ new_csrf_token);
                var upsert = {'$set':{"csrf_token":new_csrf_token}};
              //  console.log("USER ID :"+id);
                var upsert_result = db.collection('DoctorSession').updateOne({email:id}, upsert, (err,result)=>{
                    if(err){
                       // res.send({status:"Update Fail", error:err})
                       console.log("Error Occured in updateDoctorProfile")
                 //      response = {'status': 'Failure', 'reason': 'New CSRF couldn\'t updated'}
                        status="Failure";
                        reason="New CSRF couldn't updated";
                     }else{
                     
                           // res.send({status:"Update Success"});
                          // console.log("updateDoctorProfile Success");
                           //console.log("updateResult:"+result);
                           //   response = {'status': 'Success', 'new_csrf_token': new_csrf_token}
                               status="Success";
                               new_csrf_token=new_csrf_token;

                               //Updating Token Values inside the DoctorProfile
                               db.collection('DoctorProfile').updateOne({email:id}, upsert,(err,result)=>{
                                   if(err){
                                       console.log("TokenHelper UpdateDP Failure: "+err)
                                   }
                                   else{
                                    console.log("TokenHelper UpdateDP Success: "+result);
                                   }
                               });
                        }   //else-end);
                   });                     
            }else{
                // Tokens Not Verified, Return false
               // response = {'status': 'Failure', 'reason': 'Token doesn\'t match'}
               status="Failure";
               reason="Token Doesn't match";
            }                   
               // console.log("RESPONSE :"+JSON.stringify(response)) ;   
               let response={
                   status:status,
                   reason:reason,
                   new_csrf_token:new_csrf_token
               };       
            return callback(response);
            })
        })
       
 
}

function test(id){
console.log("test running "+id);
}