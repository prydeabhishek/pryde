const con=require('../database_connection/mongoConnection').con();
const assert = require('assert');
const uuid = require('uuid');

let get_csrf_token = (auth_token, csrf_token)=>{
    var result = 'false';
    con.then((db)=>{            
        const criteria={                 
            auth_token : "110ec58a-a0f2-4ac4-8393-c866d8131111",
            expired : false
        }
                      
        var cursor = db.collection('DoctorSession').find(criteria);
        cursor.each((err, docs) =>{
            console.log("return value is "+ result);
            if(result!='false'){
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
                       
                        result =  new_csrf_token; 
                        console.log("result is "+ result)
                        const ans = new_csrf_token;
                        var upsert_result = db.collection('DoctorSession').updateOne(criteria, upsert);
                   
                    }
                }          
            db.close();
            }
        })
        return result;
        // console.log('answer is '+ ans)
        // if((ans!=undefined) || (ans != null)){
        //     return ans;
        // }else{
        //     return 'false';
        // }
    });
    
}

module.exports={
    
    // Authenticates auth token with database
     validate_auth_token:(auth_token, csrf_token)=>{
        var result = 'false';
        con.then((db)=>{            
            const criteria={                 
                auth_token : "110ec58a-a0f2-4ac4-8393-c866d8131111",
                expired : false
            }
                          
            var cursor = db.collection('DoctorSession').find(criteria);
            cursor.each((err, docs) =>{
                console.log("return value is "+ result);
                if(result!='false'){
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
                           
                            result =  new_csrf_token; 
                            console.log("result is "+ result)
                            
                            var upsert_result = db.collection('DoctorSession').updateOne(criteria, upsert);
                       
                        }
                    }          
                db.close();
                }
            })
            return result;
        })
    },
    validate_csrf_token:(csrf_token, auth_token)=>{
        // To Do
        // Check if given csrf_token exists in DB under DoctorSession Collection
        // If Found, generate a new unique UUID token
        //           update previous csrf token with new
        //           return new csrf_token
        //Not Found,return not found

        return_json = {}

        if(true){
            return_json['status'] = 'Success'
            return_json['csrf_token_valid'] = true
            return_json['csrf_token'] = 'new token value'
        }else{
            return_json['status'] = 'Failure'
            return_json['csrf_token_valid'] = false
            return_json['csrf_token'] = 'None'
        }
        return return_json

    },
     validate_token:(auth_token, csrf_token)=>{
        auth_dict = validate_auth_token(auth_token)
        return_dict = {}
        if(auth_dict['auth_token_valid']){
            csrf_dict = validate_csrf_token(csrf_token, auth_token)
            if(csrf_dict['csrf_token_valid']){
                return_dict['status'] = 'Success'
                return_dict['csrf_token'] = csrf_dict['csrf_token']
                return_dict['auth_token_valid'] = true
                return_dict['csrf_token_valid'] = true

            }else{
                return_dict['status'] = 'Failure'
                return_dict['auth_token_valid'] = true
                return_dict['csrf_token_valid'] = false
            }
        }else{
            return_dict['status'] = 'Failure'
            return_dict['auth_token_valid'] = false
            return_dict['csrf_token_valid'] = false

        }

    }
}


