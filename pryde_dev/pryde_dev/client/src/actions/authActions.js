import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING ,PROFILE_DATA} from "./types";
import setAuthToken from '../utils/setAuthToken'
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/register_doctor", userData)
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
export const loginUser =( userData,history )=> dispatch => {
  
  axios
    .post("/api/login", userData)
    .then(res => {
      
      //console.log("VERIFY EMAIL:"+JSON.stringify(res.data.verify_email))
      // Save to localStorage

      // Set token to localStorage
      if(res.data.verify_email)
      {
        history.push("/showVerifyEmail");
      }
      console.log("LOGINRESPONSE_data"+JSON.stringify(res.data));
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
     // console.log("ERROR: "+JSON.stringify(err.response.data))
     if(Object.keys(err).length>0 && typeof err.response !=='undefined'){
      //  console.log("TYPEOF ERROR"+typeof err);       
      //  console.log("authAction if err.response.data triggered"+err.response.data);
       dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
     }
     else{
      console.log("authAction err.response.data else triggered"+err);
      dispatch({
       type: GET_ERRORS,
       payload: err
     })
     }
      
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
 
  //console.log("CSRF_TOKEN :"+csrf_token);  
  axios.post('/api/profile_doctor',userData)
    .then(res =>{ console.log("Profile Response :"+JSON.stringify(res));
                  localStorage.setItem('csrf_token',res.data.new_csrf_token);
                  var auth_token = localStorage.getItem('auth_token');
                  var email = localStorage.getItem('email');
                  var csrf_token=localStorage.getItem('csrf_token');
                  setAuthToken(csrf_token,auth_token,email);
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


// Fetch Doctor Profile Data
export const doctorProfile = () => dispatch => {
 // console.log("ACTION PROFILE DATA"+JSON.stringify(userData)); 
  
  axios.get('/api/dashboard_doctor')
    .then(res =>{ console.log("Fetch DoctorProfile Response :"+JSON.stringify(res));
                  localStorage.setItem('csrf_token',res.data.new_csrf_token);
                  var auth_token = localStorage.getItem('auth_token');
                  var email = localStorage.getItem('email');
                  var csrf_token=localStorage.getItem('csrf_token');
                  console.log("RESPONSE.DATA.STATUS"+JSON.stringify(res))
                  setAuthToken(csrf_token,auth_token,email);
                  dispatch({                    
                    type: PROFILE_DATA,
                    payload:res.data.status
                })
                  
                  // history.push("/dashboard/profile")
                  })
    .catch(err => {console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    }
    );
};

// Set DATA for FETCH_DOCTOR_PROFILE
// export const setFetchDataDoctor = data => {
//   console.log("SET_DOCTOR_DATA: "+JSON.stringify(data));
//   return {                    
//     type: PROFILE_DATA,
//     payload:data
// }
// };


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

export const forgotPassword =(userData,history)=>dispatch=>{
  axios.post('/api/forgot_password_doctor',userData)
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
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    })
}


export const changePassword =(passwordData,history)=>dispatch=>{
  console.log("CHANGE PASSWORD ACTION TRIGGERED:"+JSON.stringify(passwordData));
 axios.post('/api/change_passsword_doctor',passwordData)
    .then(res =>{ console.log("ChangePasswordAuthResponse :"+JSON.stringify(res));
                if(res.data.status==='Update Success')
                {
                  localStorage.setItem('csrf_token',res.data.new_csrf_token);
                  var auth_token = localStorage.getItem('auth_token');
                  var email = localStorage.getItem('email');
                  var csrf_token=localStorage.getItem('csrf_token');
                  setAuthToken(csrf_token,auth_token,email);
                 history.push("/dashboard/passwordChanged")
                 //dispatch(logoutUser({}));
                }
                  else{
                     return "ERROR OCCURED"
                  }
                  })
    .catch(err => {console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    })
}