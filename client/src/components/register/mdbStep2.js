import React from "react";
import { MDBContainer, MDBRow, MDBCol,  MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdbreact";
import AddSpecializationForm from './Specialization/AddSpecializationForm';
import SpecializationList from './Specialization/SpecializationList';
import AddEducationForm from './Education/AddEducationForm';
import EducationList from './Education/EducationList';

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { profileUser } from "../../actions/authActions";
import classnames from "classnames";
import history from '../../history'

class StepperExample extends React.Component {

state = {
  formActivePanel3: 1,
  formActivePanel1Changed: false,
  data:{
    specialization: {},
    education:[]
  },
  
}

//_________________________________________
// componentDidMount() {
//   debugger;
//   // If logged in and user navigates to Register page, should redirect them to dashboard
//     if (this.props.auth.isAuthenticated) {      
//     history.push("/dashboard");      
//   }
// }

componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
    this.setState({
      errors: nextProps.errors
    });
  }
}
//______________________________
handleSubmit=()=>{
    console.log(" HANDLE SUBMIT")
}
swapFormActive = (a) => (param) => (e) => {
  this.setState({
    ['formActivePanel' + a]: param,
    ['formActivePanel' + a + 'Changed']: true
  });
}

handleNextPrevClick = (a) => (param) => (e) => {
  this.setState({
    ['formActivePanel' + a]: param,
    ['formActivePanel' + a + 'Changed']: true
  });
}

handleSubmission = () => {
  alert('Form submitted!');
  console.log('HANDLE SUBMITEED');
  console.log("OBJECT "+JSON.stringify(this.state.data));
  const newUser=this.state.data;
  console.log(JSON.stringify(newUser))
    this.props.profileUser(newUser, history);
}
handleOnChange=(e)=>{
    this.setState({
        data:{...this.state.data,[e.target.name]:e.target.value}
    })
}
calculateAutofocus = (a) => {
  if (this.state['formActivePanel' + a + 'Changed']) {
  return true
  }
}

addSpecicalization = (specialization)=> {
    //create a unike key for each new fruit item
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.data.specialization['specializaton-' + timestamp ] = specialization;
    // set the state
    this.setState({ [this.state.data.specialization] : this.state.data.specialization});
    console.log("SPECIALIZATION LIST:" +JSON.stringify(this.state.data.specialization))
   }
 
 addEducation = (education)=> {
   debugger;
    //create a unike key for each new fruit item
    var timestamp = (new Date()).getTime();
    // update the state object
   // this.state.data.education['education-' + timestamp ] = education;
   //this.state.data.education['education-' + timestamp ] = education;
    // set the state
    console.log("*************______________***************");
    //console.log(this.state.data.education['education-' + timestamp ]);
    //console.log("EDUcation:"+this.state.data.education)
    let temp=this.state.data.education;
    let temp2=temp.push(education);
    console.log("TEMP2:"+temp2);
    console.log("TEMP1:"+JSON.stringify(temp))
    this.setState({[this.state.data.education]:temp});
  //  this.setState({ [this.state.data.education] : this.state.data.education});
    console.log("Education LIST:" +JSON.stringify(this.state.data.education))
   }
   
render() {
  return (
    <MDBContainer className="mb-5">
      <MDBCard>
        <MDBCardBody>
          <MDBRow className="pt-5 justify-content-center">
            <MDBCol md="2" className="pl-5 pl-md-0 pb-5">
              {/* <MDBStepper icon vertical>
                 <MDBStep far icon="folder-open" stepName="Basic Information" onClick={this.swapFormActive(3)(1)} vertical />
                <MDBStep icon="pencil-alt" stepName="Personal Data" onClick={this.swapFormActive(3)(2)} vertical />
                <MDBStep far icon="image" stepName="Terms and Conditions" onClick={this.swapFormActive(3)(3)} vertical />
                <MDBStep icon="check" stepName="Finish" onClick={this.swapFormActive(3)(4)} vertical /> 
              </MDBStepper> */}
              {/* <ul icon className="stepper-vertical stepper">
        <li stepName="Basic Information" onClick={this.swapFormActive(1)(1)}>
              <a href="#step-2" type="button" class="btn btn-blue-grey btn-circle-2 waves-effect btn-amber circle" data-toggle="tooltip" data-placement="top" title="Basic Information" data-original-title="Personal Data">
                <i class="fas fa-pencil-alt" aria-hidden="false"></i>
                </a>
          </li>
        
         <li far icon="folder-open" stepName="Basic Information" onClick={this.swapFormActive(1)(2)}>Specialization</li>
        
        <li  stepName="Basic Information" onClick={this.swapFormActive(1)(3)}><a href="#" className="label" ><i class="fa fa-adn fa-3x"></i></a></li>
       
        <li far icon="folder-open" stepName="Basic Information" onClick={this.swapFormActive(1)(4)}>Test</li>
      
      </ul> */}
            </MDBCol>

            <MDBCol md="7">
              {this.state.formActivePanel3 === 1 && (
              <MDBCol md="12" className="text-justify">
                <h3 className="font-weight-bold pl-0 my-4">
                  <strong>Basic Information</strong>
                </h3>
                <MDBInput label="Last Name" className="mt-4" autoFocus={this.calculateAutofocus(3)} name="last_name" value={this.state.data.last_name} onChange={this.handleOnChange}/>
               
                <MDBInput label="User Id"  name="user_id" className="mt-4" value={this.state.data.user_id} onChange={this.handleOnChange}/>

                <MDBInput label="MCI Registration Number" name="mci_reg_no" className="mt-4" value={this.state.data.mci_reg_no} onChange={this.handleOnChange} />

                <MDBInput label="Work Experience" type="number" name="work_experience" className="mt-4" value={this.state.data.work_experience} onChange={this.handleOnChange} />

                <MDBInput label="Mobile" name="mobile" className="mt-4" value={this.state.data.mobile} onChange={this.handleOnChange} />

                <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(3)(2)}>
                  next
                </MDBBtn>
              </MDBCol>
              )}
              {this.state.formActivePanel3 === 2 && (
              <MDBCol md="12">
                <h3 className="font-weight-bold pl-0 my-4">
                  <strong>Specialization</strong>
                </h3>
                <div className="component-wrapper">
            
                  <AddSpecializationForm addSpecicalization={this.addSpecicalization} />
                  <SpecializationList specializations={this.state.data.specialization} />
                </div>
               
                <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(3)(1)}>
                  previous
                </MDBBtn>
                <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(3)(3)}>
                  next
                </MDBBtn>
              </MDBCol>
              )}
              {this.state.formActivePanel3 === 3 && (
              <MDBCol md="12">
                <h3 className="font-weight-bold pl-0 my-4">
                  <strong>Education</strong>
                </h3>
                <div className="component-wrapper">
            
                  <AddEducationForm addEducation={this.addEducation} />
                  <EducationList educations={this.state.data.education} />
                </div>
                {/* <Education /> */}

                <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(3)(2)}>
                  previous
                </MDBBtn>
                <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(3)(4)}>
                  next
                </MDBBtn>
              </MDBCol>
              )}
              {this.state.formActivePanel3 === 4 && (
              <MDBCol md="12">
                <h3 className="font-weight-bold pl-0 my-4">
                  <strong>Finish</strong>
                </h3>
                <h2 className="text-center font-weight-bold my-4">
                  Registration completed!
                </h2>
                <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(3)(3)}>
                  previous
                </MDBBtn>
                <MDBBtn color="success" rounded className="float-right" onClick={this.handleSubmission}>
                  submit
                </MDBBtn>
              </MDBCol>
              )}
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    );
  };
}


// Register.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { profileUser }
)(withRouter(StepperExample));

// export default StepperExample;