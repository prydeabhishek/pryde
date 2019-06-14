import axios from "axios";
// verifyUserEmail
export function getVerifyUser(token) {
    return dispatch => {
    console.log("put request");
    axios
    .put(`/api/verify_email_doctor/${token}`)
    .then(res => {
      console.log("TOENAUTH RES:"+JSON.stringify(res))
    })
    .catch(err => console.log(err));
    };
  }