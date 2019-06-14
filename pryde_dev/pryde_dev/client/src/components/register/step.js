import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBRow, MDBCol,  MDBBtn, MDBInput ,MDBIcon} from "mdbreact";


const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Basic Information', 'Specialization', 'Education','Visiting Faculty','Awards','Achievements','Tags'];
}
let basic={},specialization={};
function handleOnChange(e){
    basic={
      ...basic,
      [e.target.name]:e.target.value
    };

    console.log("BASIC: "+JSON.stringify(basic));
    
    console.log("Specialization: "+JSON.stringify(specialization));
}

function handleOnChangeS(e){

  console.log("BASIC: "+JSON.stringify(basic));
  specialization={
    ...specialization,
    [e.target.name]:e.target.value
  }
  
  console.log("Specialization: "+JSON.stringify(specialization));
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return <>              
      <MDBRow>
       <MDBCol md="8" className="mx-auto text-justify">              
             
             <MDBInput label="First Name" className="mt-4" name="first_name" value={basic.first_name} onChange={handleOnChange}/>
             <MDBInput label="Last Name" className="mt-4" name="last_name" value={basic.last_name} onChange={handleOnChange} />
             <MDBInput label="Username" className="mt-4" name="user_id" value={basic.user_name} onChange={handleOnChange}/>
             <MDBInput label="MCI Registration Number" className="mt-4" name="mci_reg_no" value={basic.mci_reg_no} onChange={handleOnChange} />
                        
       </MDBCol>
       </MDBRow>
   </>
    case 1:
      return "HELLO"
    case 2:
      return <MDBRow>
      {/* <MDBCol md="8" className="mx-auto text-justify">              
            
            <MDBInput label="First Name" className="mt-4" name="first_name" value={specialization.first_name} onChange={handleOnChangeS}/>
            <MDBInput label="Last Name" className="mt-4" name="last_name" value={specialization.last_name} onChange={handleOnChangeS} />
            <MDBInput label="Username" className="mt-4" name="user_id" value={specialization.user_name} onChange={handleOnChangeS}/>
            <MDBInput label="MCI Registration Number" className="mt-4" name="mci_reg_no" value={specialization.mci_reg_no} onChange={handleOnChangeS} />
                      
      </MDBCol> */}
          <fieldset>
  <legend>Education</legend>
  <select class="form-control dropdown" id="education" name="education">
    <option value="" selected="selected" disabled="disabled">-- select one --</option>
    <option value="No formal education">No formal education</option>
    <option value="Primary education">Primary education</option>
    <option value="Secondary education">Secondary education or high school</option>
    <option value="GED">GED</option>
    <option value="Vocational qualification">Vocational qualification</option>
    <option value="Bachelor's degree">Bachelor's degree</option>
    <option value="Master's degree">Master's degree</option>
    <option value="Doctorate or higher">Doctorate or higher</option>
  </select>
</fieldset>
</MDBRow>;
    default:
      return 'Unknown step';
  }
}

function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  return (
    <div className={classes.root} >
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((label, index) => (
        <Step key={label} className="">
          <StepLabel className=" text-justify"><h4 className="ml-3 ml-sm-3">{label}</h4></StepLabel>
          <StepContent className=" ">
            {/* <Typography>{getStepContent(index)}</Typography> */}
            <form>{getStepContent(index)} </form>
            <div className={classes.actionsContainer}>
              <div className="mt-5">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
    {activeStep === steps.length && (
      <Paper square elevation={0} className={classes.resetContainer}>
        <Typography>All steps completed - you&apos;re finished</Typography>
        <Button onClick={handleReset} className={classes.button}>
          Reset
        </Button>
      </Paper>
    )}
  </div>
  );
}

export default VerticalLinearStepper;

