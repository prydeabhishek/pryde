import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import history from '../../history';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
     debugger;
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            {/* <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link> */}
            <div className="col s12" >
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <div>
             <form noValidate onSubmit={this.onSubmit}> 
            
            <div className="">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate               
                success="right" 
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"                  
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
              />
              <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
            </div>
            <div className="text-center">
            <input type="submit" className="btn btn-register"   value="Login" />
            </div>
          </form>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
