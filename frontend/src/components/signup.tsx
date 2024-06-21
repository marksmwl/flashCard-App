import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';



export default function Signup(props:any) {
  const navigate = useNavigate()

  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [pass, setPass] = React.useState('')

  const [activeStep, setActiveStep] = React.useState(0);
  const [emailValid, setEmailValid] = React.useState(false)
  const [usernameValid, setUsernameValid] = React.useState(false)
  const [passwordValid, setPasswordValid] = React.useState(false)

  setTimeout(()=> {
    props.func(false)
  }, 1)


  const steps = [
    {
      description: <TextField
      onChange={handleEmail}/>,
      label: 'Email',
    
    },
    {
      description:
      <TextField
      onChange={handleUserName}/>,
      label: 'Username',
      
    
    },
    {
      description: 
          <TextField
          onChange={handlePassword}/>,
      label: 'Password',
      
    },
  ];

  function handlePassword(e:any) {
    const value = e.target.value
    if (value.length >= 6) {
      setPass(value)
      setPasswordValid(true)
    }
    else {
      setPasswordValid(false)
    }
  }

  function handleUserName(e:any) {
    const value = e.target.value
    if (value.length >= 1 && value) {
      setUsername(value)
      setUsernameValid(true)
    }
    else {
      setUsernameValid(false)
    }
  }

  function handleEmail(e:any) {
    const value = e.target.value
    const regex = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

    if (!(value.includes('"','{','}', "'")) && regex.test(value)) {
      setEmail(value)
      setEmailValid(true)
    }
    else {
      setEmailValid(false)
    }
  }

  const handleNext = (e:any) => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

   async function handleFinish() {
    try {
      const formData = {
        username: username,
        password: pass,
      };
  
      const response = await fetch('http://localhost:8000/createUser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.status === 201) {
        navigate('/'); 
      }

      else if (!response.ok) {
        throw new Error('Network response was not ok');
      }  

    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  return (
    <div>
        <Box sx={{ maxWidth: 400 }}>
       
      <Stepper  activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.description}
              <Box sx={{ mb: 2 }}>
                <div>

                  <Button
                    
                    variant="contained"
                    onClick={index === steps.length - 1 ? handleFinish : handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={!(step.label === 'Email' ? emailValid : step.label === 'Username' ? usernameValid : passwordValid)}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                 
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
    </div>
    
  );

  
}


