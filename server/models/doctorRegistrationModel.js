let mongoose = require('mongoose')
let validator = require('validator')
/**
 * Schema Design and Input Validation using mongoose and validator
 */

let doctor_registration_schema= new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        validate: (value) => {
        return validator.isAlpha(value) && validator.isLength(value,{min:2,max:50})
        }
      },
   last_name:{
                type: String,
                required: true,
                validate: (value) => {
                    return validator.isAlpha(value) && validator.isLength(value,{min:2,max:50})
                }
              }, 
    mobile:{
                type: String,
                required: true,
                validate: (value) => {
                return validator.isMobilePhone(value,'en-IN');
                }
              },  

    clinic_phone_no:{
                type: String,
                required: false,
                // validate: (value) => {
                // return validator.isMobilePhone(value,'en-IN');
                // }
              }, 
    
    email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                validate: (value) => {
                return validator.isEmail(value)
                }
    },
    user_id:{
                type: String,
                required: true,
                unique: true,
                validate: (value) => {
                return   validator.isLength(value,{min:2,max:30})
                },
            },
    
    password:{
                type: String,
                required: true,
                validate: (value) => {
                return   validator.isLength(value,{min:2,max:30})
                },
            },
           
    mci_reg_no:{
                type: String,
                required: true,
                unique: true,
                validate: (value) => {
                return validator.isLength(value,{min:2,max:20})
                }
           } 
    
})
module.exports = mongoose.model('DoctorRegistration', doctor_registration_schema)