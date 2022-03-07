import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {NavLink } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Navbar,Nav} from "react-bootstrap";

const Login=()=>{
 
    const paperStyle={padding :20,height:'320px',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
    const btnstyle={margin:'8px 0'}
     
    const [msg,setMsg] = useState('');
 
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
 
    const [user, setUser] = useState({
        email: "",
        password:""
      });
 
      let history = useNavigate(); 
 
      const {email,password} = user;

      const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
 
    const signIn = () =>
    {
 
      const users = { username };  // To Store Email in Localstore and send to Home Page 
      
       if(user.email === '' )
       {
         alert('Email Field is empty or bad format')
       }
       else if(user.password === '')
       {
         alert('Pass Field is empty, symbols must to be 3-12')
       }
 
       axios.post("http://laravel.ddev.site/api/login/",user)
       .then(response => {
        setMsg(response.data);
        localStorage.setItem("users", response.data.name);
        localStorage.setItem("usersid", response.data.id);
        history("/");
      });
    }
    

    return(
      <>
      {!user === '' ? (
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
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' name="email" value={email} onChange={e => onInputChange(e)} 
                placeholder='sophie@example.com *' type="email" 
                fullWidth required/>
                <TextField label='Password'  name="password" value={password}  onChange={e => onInputChange(e)} placeholder='Enter password' type='password' fullWidth required/>
                <Button type='submit' onClick={signIn} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography style={{textAli:'center'}}> Don't Have Account ?
                  <NavLink to="/signup">
                   <span style={{marginLeft:"60px"}}>Sing up</span>
                  </NavLink>
                  <NavLink to="/">
                   <span style={{marginLeft:"4px"}}>Home</span>
                  </NavLink>
                </Typography>
            </Paper>
        </Grid>
        </>
    )
}
 
export default Login