import React, { Component } from "react";
import {connect} from 'react-redux'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,MDBInput ,MDBContainer,MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBBtn} from "mdbreact";
import {Link,NavLink} from 'react-router-dom';
import { logoutUser,changePassword } from '../../actions/authActions';
import { red } from "ansi-colors";
import history from '../../history';
const isEmpty = require("is-empty");
class NavbarPage extends Component {
state = {
  isOpen: false,
  doctor_loggedIn:false,
  showMenu:false,
  modal14: false,
  pass_data:{
    password:'',
    confirm_password:''    
  },
  pass_err:''
};

toggle = nr => () => {
  
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}
onLogoutClick=(e)=>{
  e.preventDefault();
    this.props.logoutUser()
}
onSubmitChangePassword=()=>{
  let user_data=this.state.pass_data;
  let {password,confirm_password} =this.state.pass_data;
  let bool_password_equal=password.localeCompare(confirm_password);
           if(bool_password_equal===0){
            this.setState({
              modal14: !this.state.modal14 });
                this.props.changePassword(user_data,history);                
           }
           else {
            //alert("Password Doesn't match");
            this.setState({pass_err:"Password Doesn't Match"});
            setTimeout(()=>{
              this.setState({pass_err:""});
            },3000)
           //  this.toggle(14)
           }
}

handleOnChangePassword=(e)=>{
this.setState({
           pass_data:{
                     ...this.state.pass_data,
                     [e.target.name]:e.target.value
                    }
          })
}
toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

componentWillReceiveProps(nextProps){
  debugger;
  let loggedIn=localStorage.getItem('email');

  if (nextProps) {
    this.setState({doctor_loggedIn:!isEmpty(loggedIn),showMenu:nextProps.auth.isAuthenticated})
  } 
  console.log("Logged in: "+loggedIn);
  
}

render() {
  return (
    <>
    <MDBNavbar color="white" light expand="md">
    <MDBContainer>
      <MDBNavbarBrand>
        {/* <strong className="white-text">PRYDE</strong> */}
        <img src={process.env.PUBLIC_URL+ 'logo1.png' } className="logo"/>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse  isOpen={this.state.isOpen} navbar>
        {this.state.showMenu &&
       <>
        <MDBNavbarNav left >
          {/* <MDBNavItem className="acti">
          <NavLink  to="/dashboard" className="nav-link"  activeStyle={{fontWeight: "bold",color: "red" }}>Profile</NavLink>   
          </MDBNavItem> */}
          <NavLink to="/dashboard" className="nav-link"  activeStyle={{fontWeight: "bold",color: "red" }}>Profile</NavLink>
          <NavLink to="/dashboard/profile" className="nav-link"  activeStyle={{fontWeight: "bold",color: "red" }}>Update Profile</NavLink>
          <MDBNavItem>            
          
          </MDBNavItem>
        
        </MDBNavbarNav>
            
         <MDBNavbarNav right className="mr-5">
         <MDBNavItem>
            <MDBDropdown size="lg">
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu >
                {/* <Link to="/doctor" className="dropdown-item ">Logout</Link> */}
                <MDBDropdownItem onClick={this.onLogoutClick}>Logout</MDBDropdownItem>
                <MDBDropdownItem onClick={this.toggle(14)}>Change Password</MDBDropdownItem>
                {/* <MDBDropdownItem ><NavLink to='/dashboard/changePassword'>Change Password</NavLink></MDBDropdownItem>  */}
                
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav> 
      </>
    }     
       
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>


    <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>Change Password</MDBModalHeader>
          <MDBModalBody>
            <input type="password" name="password" onChange={this.handleOnChangePassword} placeholder="Password" className="form-control" value={this.state.pass_data.password} /> <br />
            <input type="password" name="confirm_password" onChange={this.handleOnChangePassword} placeholder="Confirm Password" className="form-control" value={this.state.pass_data.confirm_password} />
            <span style={{color:'red'}}>{this.state.pass_err}</span>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>
            <MDBBtn color="primary" onClick={this.onSubmitChangePassword}>Change Password</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
    </>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser ,changePassword}
)(NavbarPage);