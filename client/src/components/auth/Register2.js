import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
export default class Register2 extends Component {
    constructor(){
        super();
        this.state={
            login:true,
            register:false,
            data_obj:{},
            formValid:false,
            form_errors:{
              first_name:"",
              last_name:"",
              email:"",
              mobile:"",
              password:""
            },
            input_valid:{
              first_name:false,             
              last_name:false,
              email:false,
              mobile:false,
              password:false
            }
        }
        
    }
    //handle create-account in mobile view
    callRegister=()=>{
        this.setState({login:!this.state.login,register:!this.state.register})
        

    }
    //handle Register Button
    // handleRegister=(e)=>{
    //     e.preventDefault();
    //     console.log("REGISTERED");
    // }

    submitHandler = event => {
      event.preventDefault();
      event.target.className += " was-validated";
      console.log(this.state.data_obj)
    };
  
    changeHandler = event => {
      let name=event.target.name;
      let value=event.target.value;
      this.setState({ data_obj:{...this.state.data_obj, [event.target.name]: event.target.value }},() => { this.validateField(name, value) });
      //console.log(this.state.data_obj);
    };
  

  //  Form Validation
//   validateField(fieldName, value) {
//     let fieldValidationErrors = this.state.form_errors;
//     let emailValid = this.state.input_valid.email;
//     let passwordValid = this.state.input_valid.password;
//     let first_nameValid = this.state.input_valid.first_name;
  
  
//     switch(fieldName) {
//       case 'email':
//         emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
//         fieldValidationErrors.email = emailValid ? '' : ' is invalid';
//         break;
//       case 'password':
//         passwordValid = value.length >= 6;
//         fieldValidationErrors.password = passwordValid ? '': ' is too short';
//         break;
//       default:
//         break;
//     }
//     this.setState({formErrors: fieldValidationErrors,
//                     emailValid: emailValid,
//                     passwordValid: passwordValid
//                   }, this.validateForm);
//   }
  
//   validateForm() {
//     this.setState({formValid: this.state.input_valid.email && this.state.input_valid.password});
//   }
  

    render() {
        return (
            <>
           
                   <h2>Register</h2>
                   <form className=" pl-3  form-c border border-danger">
                       {/* <p className="h5 text-center mb-4">Sign up</p> */}
                       <h3>Login Below </h3>
                          
                           {/* EMAIL */}
                         <MDBInput
                           label="Your email"
                           icon="envelope"
                           group
                           type="email"
                           validate
                           error="wrong"
                           success="right"
                         />
                         
                         {/* Password */}
                         <MDBInput
                           label="Your password"
                           icon="lock"
                           group
                           type="password"
                           validate
                         />
                      
                       <div className="">
                         {/* <MDBBtn color="primary">Register</MDBBtn> */}
                         <button type="button" className="btn btn-register" >Login</button>
                       </div>
                      
           </form>
               
        
             {/* <form className="fb-right pl-3 pl-md-5 form-c needs-validation" onSubmit={this.submitHandler}  noValidate>
                                  {/* <p className="h5 text-center mb-4">Sign up</p> 
                                  <h3>Login/Signup</h3>
                                  <div className="success-text">
                                  <form>
                                
                                       <MDBInput  label="First Name"  name="first_name" icon="user-md"  group type="text" required validate  value={this.state.data_obj.first_name}
                                              onChange={this.changeHandler} 
                                              error="wrong" success="right"/>
                                    
                                      
                                     
                                    <MDBInput
                                      label="Your email"
                                      icon="envelope"
                                      group
                                      type="email"
                                      name="email"
                                      validate
                                      value={this.state.data_obj.email}
                                      onChange={this.changeHandler}
                                      error="wrong"
                                      success="right" required
                                    />
                                   
                                    <MDBInput
                                      value={this.state.data_obj.password}
                                      onChange={this.changeHandler}
                                      label="Your password"
                                      icon="lock"
                                      group
                                      name="password"
                                      type="password"
                                      validate required
                                    />
                                 
                                   <MDBInput
                                    value={this.state.data_obj.confirm_password}
                                    onChange={this.changeHandler}
                                      label="Confirm Your Password"
                                      icon="exclamation-triangle"
                                      group
                                      type="password"
                                      validate
                                      name="confirm_password"
                                      error="wrong" required
                                      success="right"
                                    />
                                    </form>
                                  </div>

                                  
                                  <div className="">
                                   
                                   <input type="submit" className="btn btn-register" onClick={this.handleRegister}  value="Register" />
                                   
                                  </div>
                                 
                      </form> */}
            </>
        )
    }
}
