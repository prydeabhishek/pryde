import React, { Component } from 'react'
import history from '../../history';
export default class ForgotPasswordChanged extends Component {

    componentDidMount(){
        setTimeout(()=>{
           history.push('/login')  
        },10000)
    }
    render() {
        return (
            <div className="text-center">
                <h2 className="mt-5"></h2>
            </div>
        )
    }
}
