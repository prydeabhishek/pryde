import { SET_CURRENT_USER, USER_LOADING ,PROFILE_DATA} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  doctor:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      //console.log("Inside authREducer action.payload "+JSON.stringify(action.payload));
          console.log("AUTHANTICATED OR NOT :"+!isEmpty(action.payload))
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };}

      case PROFILE_DATA: {
        console.log("Inside authREducer testFETCH_DOCTOR_PROFILE"+JSON.stringify(action.payload));
     
      return {
              ...state,
             doctor: action.payload
          };
        
        } 
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
