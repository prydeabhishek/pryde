import React,{Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import {Link ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../../history'
import {forgotPassword} from '../../actions/authActions'
import axios from 'axios'
class ForgotPassword extends Component {
    state={
        userData:{
            email:'',
            otp:''
        }       
    }


    handlePasswordOnChange=(e)=>{
        this.setState({userData:{
            ...this.state.userData,
            [e.target.name]:e.target.value
        }})
    }
 
    sendOtpAgain=()=>{
       console.log('sendOtpAgain triggered');
    }

    verifyOtp=()=>{
        console.log('VerifyOtp triggered');
    }
    handleSubmit=(e)=>{
      e.preventDefault();
      console.log(this.state.email);
      let email={email:this.state.email}
     // this.props.forgotPassword(email)

     axios.post('http://localhost:8080/forgot_password_doctor',email)
    .then(res =>{ console.log("ForgotPasswordAuthResponse :"+JSON.stringify(res));
                if(res.data.status==='success')
                {                  
                 history.push("/forgotPasswordChanged")
                 //dispatch(logoutUser({}));
                }
                  else{
                     return "ERROR OCCURED"
                  }
                  })
    .catch(err => {console.log(err)
    })
    }
    render() {
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
                value={this.state.userData.email}
                name="email"
                onChange={this.handlePasswordOnChange}
              />
            </div>
            <div className="grey-text">
              
              <MDBInput
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
              />              
            </div>
            <div className="text-center">
             <MDBBtn onClick={this.verifyOtp}>Confirm OTP</MDBBtn>
              <MDBBtn onClick={this.sendOtpAgain}>Send Again</MDBBtn>
            </div>
            <div className="text-center">
              <MDBBtn outline color="info" type="submit" onClick={this.handleSubmit}>               
                Send Confirmation
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
            
            </>
        )
    }
}



const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { forgotPassword }
  )(withRouter(ForgotPassword));
  

