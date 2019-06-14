import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {  Route, Switch } from "react-router-dom";
import StepperExample from '../register/mdbStep2';
import Profile from '../layout/Profile';
import PasswordChanged from '../layout/passwordChanged';
import ChangePassword from '../layout/ChangePassword'
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
   
    const { user } = this.props.auth;
    //console.log("this.props.auth.user"+JSON.stringify(this.props));
    return (
      <div style={{ height: "75vh" }} className="container-fluid text-center valign-wrapper">
        <div className="row   mx-auto">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.first_name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into {" "}
                <span style={{ fontFamily: "monospace" }}>Pryde</span> app 👏
              </p>
            </h4>
            {/* <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button> */}
          </div>
        </div>
        <div className="row">
           {/* <VerticalLinearStepper /> */}
           <Switch>
           <Route path="/dashboard" exact component={Profile} />
           <Route  path="/dashboard/profile" component={StepperExample} />
           <Route  path="/dashboard/changePassword" component={ChangePassword} />
           <Route  path="/dashboard/passwordChanged" component={PasswordChanged} />
           </Switch>
            {/* <StepperExample />  */}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
