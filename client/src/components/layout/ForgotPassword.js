import React,{Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import {Link ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../../history'
import {forgotPassword} from '../../actions/authActions'
import axios from 'axios'



export default class ForgotPassword extends Component {
    state={
        email:'',
        showError:false,
        messageFromServer:''     
    };


    handleChange=name=>e=>{
        this.setState({[name]:e.target.value})
    }
 
    // sendOtpAgain=()=>{
    //    console.log('sendOtpAgain triggered');
    // }

    // verifyOtp=()=>{
    //     console.log('VerifyOtp triggered');
    // }

    handleSubmit=(e)=>{
      e.preventDefault();
     if(this.state.email===''){
       this.setState({
         showError:false,
         messageFromServer:''
       })
     }
     else{
        axios.post('http://localhost:8080/forgot_password_doctor',{email:this.state.email})
     .then(res =>{ console.log("ForgotPasswordAuthResponse :"+JSON.stringify(res.data));
                 if(res.data ==='email not in db'){
                    this.setState({
                      showError:true,
                      messageFromServer:''
                    });
                 }
                 else if(res.data==='recovery email sent'){                  
                   this.setState({
                     showError:false,
                     messageFromServer:'recovery email sent'
                   });
                //  history.push("/forgotPasswordChanged")
                  //dispatch(logoutUser({}));
                 }
                 })
     .catch(err => {
       console.log(err.data)
     })    

     }
      
    }
    render() {

      const {email,messageFromServer,showNullError,showError}=this.state;
        return (
            <>
              <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol md="6 mx-auto " >
          <form>
              <Link to="/"><i className="fa fa-share-square"> Home</i></Link>
            <p className="h5 text-center mb-4">Forgot Password</p>
            <div className="grey-text">
              
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                value={email}
                name="email"
                onChange={this.handleChange('email')}
              />
            </div>
            <div className="grey-text">
              
              {/* <MDBInput
                label="OTP"
                icon="envelope"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                value={this.state.userData.otp}
                name="otp"
                onChange={this.handlePasswordOnChange}
              />               */}
            </div>
            {/* <div className="text-center">
             <MDBBtn onClick={this.verifyOtp}>Confirm OTP</MDBBtn>
              <MDBBtn onClick={this.sendOtpAgain}>Send Again</MDBBtn>
            </div> */}
            <div className="text-center">
              <MDBBtn outline color="info" type="submit" onClick={this.handleSubmit}>               
                Send Confirmation
              </MDBBtn>
            </div>
          </form>
          {showNullError && (
            <div>
              <p>The Email Address cannot be null.</p>
            </div>
          )}
          
          {showError && (
              <div>
                  <p>
                    That email address isn't recognized. Please try again or register for a new account
                  </p>
                  <Link to='/register' >Register</Link>
              </div>
          )}
          {messageFromServer==='recovery email sent' && (
               <div>
                  <h3> Password Reset Email Successfully Sent!</h3>
               </div>            
          )}
          {/* <Link to='/'>Home</Link> */}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
            
            </>
        )
    }
}



// const mapStateToProps = state => ({
//     auth: state.auth,
//     errors: state.errors
//   });
  
//   export default connect(
//     mapStateToProps,
//     { forgotPassword }
//   )(withRouter(ForgotPassword));
  

