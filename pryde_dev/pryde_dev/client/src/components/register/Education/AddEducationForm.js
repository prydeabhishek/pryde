import React, { Component } from 'react'
import {   MDBBtn } from "mdbreact";
export default class AddEducationtionForm extends Component{
    constructor(){
        super();
        this.state={
            data:{course_name:"",
            course_institution:"",
            starting_date:"",
            ending_date:""
          }
        }
    }
    handleChange=(e)=>{
         this.setState({data:{...this.state.data,[e.target.name]:e.target.value}})
    }
    createEducation =(e)=> {
      e.preventDefault();
      //get the fruit object name from the form
      //var education = this.refs.educationName.value;
      //if we have a value
      //call the addFruit method of the App component
      //to change the state of the fruit list by adding an new item
    //   if(typeof education === 'string' && education.length > 0) {
    //     this.props.addEducation(education);
    //     //reset the form
    //     document.educationForm.reset();
    //   }
      var education=this.state.data;
         this.props.addEducation(education);
        //  document.educationForm.reset();
         this.setState({data:{course_name:"",
                               course_institution:"",
                               starting_date:"",
                               ending_date:""
                             }});
     }
     render () {
      return(
          <>
        
        <form className="form" name="educationForm" ref="educationForm" onSubmit={this.createEducation}>
        <div className="form-group">                    
            <input type="text"  placeholder="Course Name" ref="educationName" name="course_name" value={this.state.data.course_name} 
            onChange={this.handleChange} className="form-control" />          
        </div>

        <div className="form-group">                    
            <input type="text"  placeholder="Institution Name"  name="course_institution" value={this.state.data.course_institution} 
            onChange={this.handleChange} className="form-control" />          
        </div>

        <div className="form-group">                    
            <input type="date"  placeholder="Starting Date"  name="starting_date" value={this.state.data.starting_date} className="form-control" onChange={this.handleChange} />          
        </div>

        <div className="form-group">                    
            <input type="date"  placeholder="Ending Date"  name="ending_date" value={this.state.data.ending_date} onChange={this.handleChange} className="form-control" />          
        </div>
        <MDBBtn color="mdb-color" rounded className="float-right" type="submit">
                  Add Education
                </MDBBtn>
        
       </form>
       
    
    </>
      )
     }
    }
