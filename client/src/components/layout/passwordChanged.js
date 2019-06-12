import React, { Component } from 'react';
import {logoutUser} from '../../actions/authActions';
import {connect} from 'react-redux';
import history from '../../history';
class PasswordChanged extends Component {

     componentDidMount(){
        // if(this.props){
        //     this.props.logoutUser();
        //  }
        console.log("this.props::::"+JSON.stringify(this.props))
        if(this.props.auth.isAuthenticated){             
            setTimeout(()=>{                                
                   this.props.logoutUser();              
            },6000)
        }
        else{
            setTimeout(()=>{                                
             history.push('/login')             
         },6000)
        }
         
     }

    // onLogoutClick=(e)=>{
    //     e.preventDefault();
    //       this.props.logoutUser()
    //   }
    render() {
        return (
            <div className="text-center">
                <h2>Password Changed Succesfully,You will be redirected to login screen....</h2>
                 
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser}
  )(PasswordChanged);