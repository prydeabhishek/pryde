import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
export default class EducationList extends Component {
  
    render() {
      // console.log("LENGTH: "+Object.keys(this.props.educations).length);
      var edu_obj_size=Object.keys(this.props.educations).length;
      var c=0;
        return (
            <>
        {/* <ul className=""> */}
    { edu_obj_size>0 &&
        <MDBTable striped responsive hover>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Course Name</th>
          <th>Insitution Name</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {  
            Object.keys(this.props.educations).map(obj=>{
              return <tr key={obj}>
                         <td>{++c}</td>
                        <td>{this.props.educations[obj]["course_name"]}</td>
                        <td>{this.props.educations[obj]["course_institution"]}</td>
                        <td>{this.props.educations[obj]["starting_date"]}</td>
                        <td>{this.props.educations[obj]["ending_date"]}</td>
                     </tr>
              console.log("Object "+JSON.stringify(this.props.educations[obj]))
            })
            
            }
      </MDBTableBody>
    </MDBTable>
    }
         
         </>
        )
    }
}

