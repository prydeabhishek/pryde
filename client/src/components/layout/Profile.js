import React, { Component } from 'react';
import axios from 'axios'
import {  MDBTable, MDBTableBody, MDBTableHead ,MDBContainer, MDBRow, MDBCol,  MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdbreact";
export default class Profile extends Component {
    state={
        data:{}
    }
    componentDidMount(){
        axios.get('http://localhost:8080/')
    }
    render() {
        return (
            <MDBContainer className="mb-5">
            <MDBCard>
              <MDBCardBody>
                <MDBRow className="pt-5 justify-content-center">
                    <MDBCol>
                         <h2>Profile Page</h2>
                         <MDBTable striped responsive hover>
      {/* <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Course Name</th>
          <th>Insitution Name</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </MDBTableHead> */}
      <MDBTableBody>
      <tr>
          <th>NAME</th> <td>Abhishek</td>          
      </tr>
      <tr>
          <th>UserID</th> <td>Abhishek</td>          
      </tr>
      <tr>
          <th>Email</th> <td>Abhishek</td>          
      </tr>
      <tr>
          <th>Mobile</th> <td>Abhishek</td>          
      </tr>
      <tr>
          <th>Education</th> <td>Abhishek</td>          
      </tr>
      <tr>
          <th>Specialization</th> <td>Abhishek</td>          
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
