import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { NavLink } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import {Navbar,Nav} from "react-bootstrap";
import Footer from "./Footer";
 
const Signup=()=>{
 
    const paperStyle={padding :20,height:'350px',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
    const btnstyle={margin:'8px 0'}
 
    const[errors,setErrors] = useState('');
    const [user, setUser] = useState({
        name: "",
        email: "",
        password:""
      });
      
      const {name, email,password} = user;
      const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
 
   async function  signup()
       {
        let result = await axios.post("http://laravel.ddev.site/api/register",user);
        setErrors('Registration Successful')
        setUser({name:"",email:"",password:""}) // To Clear all fields
        }

     
    return(
        <>
        {!user == '' ? (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">HOME</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Nav.Link href="/signup">Register</Nav.Link>
                        </Navbar.Text>
                </Navbar.Collapse>
          </Navbar>
          ) : (
              <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">Home</Navbar.Brand>
              <Nav className="me-auto">
              </Nav>
            </Navbar>
         )}
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                    <h3 style={{color:"green"}}>{errors}</h3>
                </Grid>
                
                <TextField label='Name' name="name" value={name} onChange={e => onInputChange(e)} placeholder='Enter Name' type='text' fullWidth required/>
                <TextField label='Email'  name="email" value={email}  onChange={e => onInputChange(e)} placeholder='Enter Email' type='email' fullWidth required/>
                <TextField label='Password'  name="password" value={password}  onChange={e => onInputChange(e)} placeholder='Enter password' type='password' fullWidth required/>
             
                <Button type='submit' onClick={signup} color='primary' variant="contained" style={btnstyle} fullWidth>Singup</Button>
              
                <Typography>Click Here for
                   <NavLink to="/login">
                       <span style={{marginLeft:"4px"}}>Login</span>
                  </NavLink>
                </Typography>
            </Paper>
        </Grid>
        <Footer/>
        </>
    )
}
 
export default Signup