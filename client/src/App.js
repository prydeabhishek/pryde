import React, { Component } from "react";
import {  Route, Switch } from "react-router-dom";


import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";

import NavbarPage from "./components/layout/Navbar2";
import Landing from "./components/layout/Landing";
import LoginLanding from "./components/layout/LoginLanding";
import RegisterLanding from "./components/layout/RegisterLanding";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Token from "./components/auth/Token";
import Profile from './components/layout/Profile'
import "./App.css";

// // Check for token to keep user logged in
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
//   // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());

//     // Redirect to login
//     window.location.href = "./login";
//   }
// }
class App extends Component {
  render() {
    return (
    
          <div className="App ">
            <NavbarPage />
            <Route path="/verify/:token" component={Token} />
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={RegisterLanding} />
            <Route  path="/login" component={LoginLanding} />
            <Switch>
              <PrivateRoute  path="/dashboard" component={Dashboard} />
              {/* <Route  path="/profile" component={Profile} /> */}
            </Switch>
          </div>
       
    );
  }
}
export default App;
