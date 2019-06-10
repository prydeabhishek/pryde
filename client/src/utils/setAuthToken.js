import axios from "axios";

const setAuthToken = (csrf_token,auth_token,email)=> {
  
  if (csrf_token )  {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["csrf_token"] = csrf_token;
    axios.defaults.headers.common["auth_token"] = auth_token;
    axios.defaults.headers.common["email"] = email;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["csrf_token"];
    delete axios.defaults.headers.common["auth_token"];
    delete axios.defaults.headers.common["email"];
  }
};

export default setAuthToken;
