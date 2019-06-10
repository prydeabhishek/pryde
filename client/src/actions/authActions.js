import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import setAuthToken from '../utils/setAuthToken'
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:8080/register_doctor", userData)
    .then(res => history.push("/login"))
    .catch(err => {console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    }
    );
};


// Login - get user token
export const loginUser = userData => dispatch => {
  
  axios
    .post("http://localhost:8080/api/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      console.log(res);
      const { csrf_token,auth_token,email,user} = res.data;
      localStorage.setItem("csrf_token", csrf_token);
      localStorage.setItem("auth_token", auth_token);
      localStorage.setItem("email", email);
      // Set token to Auth header
      setAuthToken(csrf_token,auth_token,email);
      // Decode token to get user data
      // const decoded = jwt_decode(token);
       // Set current user
       console.log("USER: "+JSON.stringify(user))
       dispatch(setCurrentUser(user));
    })
    .catch(err =>{
     // console.log("ERROR: "+JSON.stringify(err.response.data));
     console.log("ERROR: "+JSON.stringify(err));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};

// Set logged in user
export const setCurrentUser = user => {
  console.log("SET_USER: "+JSON.stringify(user));
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Profile Update

export const profileUser = (userData, history) => dispatch => {
  console.log("ACTION PROFILE DATA"+JSON.stringify(userData));
  //var csrf_token = localStorage.getItem('csrf_token');
  var auth_token = localStorage.getItem('auth_token');
  var email = localStorage.getItem('email');
  //console.log("CSRF_TOKEN :"+csrf_token);
  
  
  axios.post('http://localhost:8080/profile_doctor',userData)
    .then(res =>{ console.log("Profile Response :"+JSON.stringify(res));
                  localStorage.setItem('csrf_token',res.data.new_csrf_token)
                   history.push("/dashboard/profile")
                  })
    .catch(err => {console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    }
    );
};


// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("csrf_token");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("email");
  // Remove auth header for future requests
  //setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
