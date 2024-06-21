import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import '../styles/box.css'
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login(props:any) {
   
    const navigate = useNavigate()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function verifyUser() {
       

        const formData = {
            username: username,
            password: password,
        };

        const response = await fetch('http://localhost:8000/verifyUser/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        
        if (response.status === 200) {
            localStorage.clear()
            localStorage.setItem('usr',btoa(username))
            navigate('/home')
        }
    }

    function handleUserName(e:any) {
        const value = e.target.value
        setUsername(value)
    }

    function handlePassword(e:any) {
        const value = e.target.value
        setPassword(value)
    }

    return(
        <>
            <Box className='box-container'>

                <section className='login-box'>
                    <TextField id="standard-basic" label="Username" variant="standard" onChange={handleUserName}/> 
                    <TextField id="standard-password" label="Password" variant="standard" onChange={handlePassword}/>
                    <Button variant='outlined' onClick={verifyUser}>Sign In</Button>
                </section>

                <section>
                    Don't have an account? 
                    <Link to="/signup"><Button variant='text'>Sign Up</Button></Link> 
                </section>
             
            </Box>
            <Box>
                
            </Box>
        </>
    )
}

export default Login