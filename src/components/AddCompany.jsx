import React, {useState, useEffect} from 'react';
import { Grid,Paper, Avatar, TextField, Button, FormControl} from '@material-ui/core';
import {Navbar, Nav,Dropdown, ButtonGroup} from "react-bootstrap";
import axios from 'axios';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import Category from "./Category";

const AddCompany = ()=>{
    
    const paperStyle={padding :20,height:'550px',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
    const {users} = useParams();  
    let history = useNavigate(); 
    const userid= localStorage.getItem("usersid");
    const user = localStorage.getItem("users");
    const [category, setCategory] = useState({
        data: ""
    })

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
    useEffect(()=>{
        fetch('http://laravel.ddev.site/api/category')
            .then(response => response.json())
            .then(data=>{
                setCategory(data)
                console.log(data)
            })

            .catch(error => {
                throw(error);
            })
    },[setCategory])

   

    const {company,code,vat,address,director,description,user_id,category_id} = companys;
    const onInputChange= e => {
        setCompany({...companys, [e.target.name]: e.target.value });
    };
    console.log(companys);

    async function  addCompany()
    {   
 let result = await axios.post("http://laravel.ddev.site/api/add-company",companys)
                .then((response)=>{
                    console.log(response.data)
                    setErrors(response.data)
                });
        setCompany({
                    company: '',
                    code: '',
                    vat: '',
                    address: '',
                    director: '',
                    description: '',
                    user_id: userid,
                    category_id: '' });
                    
    }
    return (
        <>
                {!user == '' ? (
                <Navbar bg="dark" variant="dark" >
                   <Navbar.Brand href="/">HOME</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                     <Dropdown variant="dark" as={ButtonGroup}>
                        <Navbar.Text>
                            <p style={{color:'#fff'}} className="mb-1">Hello, {user}</p>
                        </Navbar.Text>
                        <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            <Dropdown.Item href="/login" onClick={logout}>Logout</Dropdown.Item>
                            <Dropdown.Item href="/user-company" >Your company list</Dropdown.Item>
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
        {
                            Object.keys(errors).length > 0 && errors[0] != "Company created succesfully" && (
                                <Grid>
                                    <Paper style={{padding :30, width:600, margin:"30px auto"}}>
                                        <div className="alert alert-danger">
                                            {
                                                Object.entries(errors).map(([key, value])=>(
                                                    <div key={key}>{value}</div>
                                                ))
                                            }
                                        </div>
                                    </Paper>
                                </Grid>)
                        }
                        {
                            Object.keys(errors).length > 0 && errors[0] == "Company created succesfully" && (
                                <Grid>
                                    <Paper style={{padding :30, width:600, margin:"30px auto"}}>
                                        <div className="alert alert-success">
                                            {
                                                Object.entries(errors).map(([key, value])=>(
                                                    <div key={key}>{value}</div>
                                                ))
                                            }
                                        </div>
                                    </Paper>
                                </Grid>)
                        }
        <Paper style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>ADD COMPANY</h2>
            </Grid>
            <TextField label='Company' name="company" value={company} onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <TextField label='Code'  name="code" value={code}  onChange={e => onInputChange(e)} type='number' fullWidth required/>
            <TextField label='Vat'  name="vat" value={vat}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <TextField label='Address'  name="address" value={address}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <TextField label='Ceo'  name="director" value={director}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <TextField label='Description'  name="description" value={description}  onChange={e => onInputChange(e)} type='text' fullWidth required/>
            <FormControl fullWidth>
                                <select
                                    style={{ height:'30px',borderTop:'none', backgroundColor:'#fff'}}
                                    id="demo-simple-select"
                                    value={category_id}
                                    name="category_id"
                                    onChange={e => onInputChange(e)}
                                >
                                    <option value="" selected disabled>--SELECT CATEGORY--</option>
                                    {(category.data.length)? category.data.map((w)=><Category key={w.id} id={w.id} category={w.category}/>):null}
                                </select>
                            </FormControl>
            <TextField label='User' className="invisible"  name="user_id" onChange={e => onInputChange(e)} type='number' value={user_id} fullWidth required/>
            <Button type='submit' onClick={addCompany} color='primary' variant="contained" fullWidth>Add Company</Button>
        </Paper>
    </Grid>
    <Footer/>
    </>
    );

}
export default AddCompany