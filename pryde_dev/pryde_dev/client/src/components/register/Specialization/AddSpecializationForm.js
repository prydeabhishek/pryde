import React, { Component } from 'react'
import {   MDBBtn } from "mdbreact";
export default class AddSpecializationForm extends Component{
    createSpecialization =(e)=> {
      e.preventDefault();
      //get the fruit object name from the form
      var specialization = this.refs.specializationName.value;
      //if we have a value
      //call the addFruit method of the App component
      //to change the state of the fruit list by adding an new item
      if(typeof specialization === 'string' && specialization.length > 0) {
        this.props.addSpecicalization(specialization);
        //reset the form
        this.refs.specializationForm.reset();
      }
     }
     render () {
      return(
        <form className="form-inline" ref="specializationForm" onSubmit={this.createSpecialization}>
        <div className="form-group">
          <label htmlFor="fruitItem">
           
            <input type="text" id="fruitItem" placeholder="e.x.surgean" ref="specializationName" className="form-control" />
          </label>
        </div>
        <MDBBtn color="mdb-color" rounded className="float-right" type="submit">
                  Add Specialization
                </MDBBtn>
        {/* <button type="submit" className="">Add Specialization</button> */}
       </form>
      )
     }
    }
