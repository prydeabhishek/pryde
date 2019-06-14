import React, { Component } from "react";
import { Link , Route, Switch } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import Register2 from '../auth/Register2';
import Register from '../auth/Register'
class RegisterLanding extends Component {
  render() {
    return (
         

      <div style={{  }} className="register-body border border-success ">
      <MDBContainer>
      <MDBRow className="p-3 register" >
      <MDBCol md="10" className="offset-md-1">
         <MDBRow>
              <MDBCol md="7" className="register-left mb-3 ">
                <img  src={process.env.PUBLIC_URL+"arrow1.png" }/>
                 <h3>Join Us</h3>
                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque ducimus molestias placeat voluptas nemo fugiat id sequi. Accusantium .</p>  
                 <button type="button" className="btn btn-register">About US</button>
                
               </MDBCol> 
               <MDBCol md="5" className="register-right mb-3    ">
              
               <Register />
               
               </MDBCol>
           </MDBRow>
         </MDBCol>
        </MDBRow>    
        </MDBContainer>
        {/* <div className="row text-center">
          <div className="col-12 col-sm-12  text-center">
            {/* <h4>
              <b>Build</b> a login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
              scratch
            </h4> 
            <p className="flow-text grey-text text-darken-1 ">
             Welcome To The Pryde Healthcare and Wellness Solutions
            </p>
            <br />
            <div className="col col-sm-6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default RegisterLanding;
