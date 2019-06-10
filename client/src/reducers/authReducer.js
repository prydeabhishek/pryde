import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {console.log("Inside authREducer action.payload "+JSON.stringify(action.payload));
          console.log("AUTHANTICATED OR NOT :"+!isEmpty(action.payload))
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };}
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
