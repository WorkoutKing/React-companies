import React, {useState} from 'react';
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core';
import {Container, Navbar, Nav, NavDropdown, Dropdown, ButtonGroup, DropdownButton} from "react-bootstrap";
import axios from 'axios';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate, useParams } from "react-router-dom";


const AddCompany = ()=>{
    
    const paperStyle={padding :20,height:'550px',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}

    const {users} = useParams();  
    let history = useNavigate(); 
    
    const userid= localStorage.getItem("usersid");
    console.log(userid)

    const user = localStorage.getItem("users");
    console.log(user);

    const logout = () => 
    {
        localStorage.removeItem("users")
        history("/login");
    }

    const[errors,setErrors] = useState('');
    const [companys, setCompany] = useState({
        company: '',
        code: '',
        vat: '',
        address: '',
        director: '',
        description: '',
        category_id: '1',
        user_id: userid,
        
    });

   

    const {company,code,vat,address,director,description,user_id,category_id} = companys;
    const onInputChange= e => {
        setCompany({...companys, [e.target.name]: e.target.value });
    };
    console.log(companys);
    async function  addCompany()
    {   
 let result = await axios.post("http://laravel.ddev.site/api/add-company",companys);
        setErrors('Company added!')
        setCompany({
                    company: '',
                    code: '',
                    vat: '',
                    address: '',
                    director: '',
                    description: '',
                    user_id: '',
                    category_id: '' });
                    history("/user-company");
    }

    return (
        <>
                {!user == '' ? (
                <Navbar bg="dark" variant="dark" >
                   <Navbar.Brand href="/">HOME</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                     <Dropdown variant="dark" as={ButtonGroup}>
                        <Navbar.Text>
                            <Button>
                            <p style={{color:'#fff'}} className="mb-1">Hello, {user}</p>
                            </Button>
                        </Navbar.Text>
                        <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            <Dropdown.Item href="/login" onClick={logout}>Logout</Dropdown.Item>
                            <Dropdown.Item href="/add-company" >Add company</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                        </Navbar.Collapse>
               </Navbar>
            ) : (
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                  
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                          <Navbar.Text>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Nav.Link href="/signup">Register</Nav.Link>
                        </Navbar.Text>
                </Navbar.Collapse>

              </Navbar>
           )}
        <Grid>
        <Paper style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>ADD COMPANY</h2>
                <h3 style={{color:"green"}}>{errors}</h3>
            </Grid>
            <TextField label='Company' name="company" value={company} onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <TextField label='Code'  name="code" value={code}  onChange={e => onInputChange(e)} type='number' fullWidth required/>
            <TextField label='Vat'  name="vat" value={vat}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <TextField label='Address'  name="address" value={address}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <TextField label='Ceo'  name="director" value={director}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <TextField label='Description'  name="description" value={description}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <TextField label='Category'  name="category_id" value={category_id}  onChange={e => onInputChange(e)} type='number' fullWidth required/>
            <TextField label='User' className="invisible"  name="user_id" onChange={e => onInputChange(e)} type='number' value={user_id} fullWidth required/>
            <Button type='submit' onClick={addCompany} color='primary' variant="contained" fullWidth>Add Company</Button>
        </Paper>
    </Grid>
    </>
    );

}
export default AddCompany