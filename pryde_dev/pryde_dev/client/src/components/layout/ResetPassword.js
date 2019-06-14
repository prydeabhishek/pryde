/* eslint-disable no-console */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const loading = {
  margin: "1em",
  fontSize: "24px"
};

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      updated: false,
      isLoading: true,
      error: false
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { token }
      }
    } = this.props;
    try {
      const response = await axios.get("/api/reset", {
        params: {
          resetPasswordToken: token
        }
      });
      // console.log(response);
      if (response.data.message === "password reset link a-ok") {
        this.setState({
          username: response.data.first_name,
          updated: false,
          isLoading: false,
          error: false
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  updatePassword = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const {
      match: {
        params: { token }
      }
    } = this.props;
    try {
      const response = await axios.put("/api/updatePasswordViaEmail", {
        username,
        password,
        resetPasswordToken: token
      });
      console.log(response.data);
      if (response.data.message === "password updated") {
        this.setState({
          updated: true,
          error: false
        });
      } else {
        this.setState({
          updated: false,
          error: true
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const { password, error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <Link to="/">Home</Link>
            <Link to="/forgotPassword">Forgot Password</Link>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div>
        <HeaderBar title={title} />
        <form className="password-form" onSubmit={this.updatePassword}>
          <input
            type="password"
            value={password}
            onChange={this.handleChange("password")}
          />
          <input type="Submit" value="Submit" />
        </form>

        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <Link to="/login">Login</Link>
          </div>
        )}
        <Link to="/">Home</Link>
      </div>
    );
  }
}
