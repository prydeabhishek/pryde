import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import {doctorProfile } from "../../actions/authActions";
import {  MDBTable, MDBTableBody, MDBTableHead ,MDBContainer, MDBRow, MDBCol,  MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdbreact";
 class Profile extends Component {
    state={
        data:[]
    }
    // componentDidMount(){
    //     axios.get('http://localhost:8080/dashboard_doctor').then(res=>{
    //         console.log("Get Doctor Profile Data"+JSON.stringify(res));
    //         this.setState({data:res.data.DoctorProfile})
            
    //     }).catch(err=>console.log("fetch doctor profile error "+err))
    // }
    componentWillMount(){
        // this.setState({data:this.props.auth.user})
         console.log("FETCH DOCTOR PROFILE COMPDIDMOUNT")
        this.props.doctorProfile();
            // this.setState({data:this.props.test.doctor})
            // this.setState({data:this.props.test.doctor},()=>{
            //     console.log("doctorProfile "+JSON.stringify(this.state.data))
            // })
        
    }
    
   
    render() {
       const{doctor}=this.props.test;
       let arr=doctor['education']; 
    
      
        return (
            <MDBContainer className="mb-5">
            <MDBCard>
              <MDBCardBody>
                <MDBRow className="pt-5 justify-content-center">
                    <MDBCol>
                         <h2>Profile Page</h2>
                         <MDBTable striped responsive hover>
     
      <MDBTableBody>
      <tr>
          <th>NAME</th>
           <td>{doctor.first_name}</td>          
      </tr>
      <tr>
          <th>UserID</th>
          <td>{doctor.user_id}</td>          
      </tr>
      <tr>
          <th>Email</th>
          <td>{doctor.email}</td>          
      </tr>
      <tr>
          <th>Mobile</th>
          <td>{doctor.mobile}</td>           
      </tr>
      <tr>
          <th>Education</th>
            <td>
              
           </td>          
      </tr>
      <tr>
          <th>Specialization</th>
          {/* <td>{this.state.data.specialization}</td>           */}
      </tr>
            
            
            
      </MDBTableBody>
    </MDBTable>
                    </MDBCol>
                 </MDBRow>
                 </MDBCardBody>
                 </MDBCard>
                 </MDBContainer>   
            
               
        
        )
    }
}

const mapStateToProps = state => ({
    test:state.auth
  });
  
  export default connect(
    mapStateToProps,
    {doctorProfile}
  )(Profile);