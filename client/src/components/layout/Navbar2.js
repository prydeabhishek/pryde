import React, { Component } from "react";
import {connect} from 'react-redux'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,MDBInput ,MDBContainer} from "mdbreact";
import {Link,NavLink} from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
const isEmpty = require("is-empty");
class NavbarPage extends Component {
state = {
  isOpen: false,
  doctor_loggedIn:false,
  showMenu:false
};
onLogoutClick=(e)=>{
  e.preventDefault();
    this.props.logoutUser()
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
                <MDBDropdownItem onClick={this.onChangePassword}>Change Password</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav> 
      </>
    }     
       
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavbarPage);