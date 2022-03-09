import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import {Navbar, Nav,Dropdown, ButtonGroup} from "react-bootstrap";
import { Grid,Paper,FormControl} from '@material-ui/core';
import Category from "./Category";



export default function Update() {
  
  const userstoken = localStorage.getItem("userstoken");
  let history = useNavigate(); 
  const user = localStorage.getItem("users");
  const navigate = useNavigate();
  const [categories, setCategories] = useState({
    data: ""
})
  const logout = () => 
  {
      localStorage.removeItem("users")
      history("/login");
  }
  const { id } = useParams()

  const [company, setCompany] = useState("")
  const [code, setCode] = useState("")
  const [vat, setVat] = useState("")
  const [address, setAddress] = useState("")
  const [director, setDirector] = useState("")
  const [description, setDescription] = useState("")
  const [user_id,setUser_id] = useState("")
  const [category_id,setCategory_id] = useState("")

  const [validationError,setValidationError] = useState('')

  useEffect(()=>{
    fetchProduct()
  },[])
  useEffect(()=>{
    fetch('http://laravel.ddev.site/api/category')
        .then(response => response.json())
        .then(data=>{
            setCategories(data)
            console.log(data)
        })

        .catch(error => {
            throw(error);
        })
},[setCategories])

  const fetchProduct = async () => {
    await axios.get(`http://laravel.ddev.site/api/company/${id}`).then(({data})=>{
            setCompany(data.data.company);
            setCode(data.data.code);
            setVat(data.data.vat);
            setAddress(data.data.address);
            setDirector(data.data.director);
            setDescription(data.data.description);
            setUser_id(data.data.user);
            setCategory_id(data.data.category_id);
            console.log(data.data);
    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    },[setCompany])
  }
  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'POST');
    formData.append('company', company);
    formData.append('code', code);
    formData.append('vat',vat );
    formData.append('address', address);
    formData.append('director', director);
    formData.append('description', description);
    formData.append('user_id', user_id.id);
    formData.append('category_id', category_id);

    await axios.post(`http://laravel.ddev.site/api/update/${id}`, formData)
    .then((response)=>{
      console.log(response.data)
      setValidationError(response.data)
    })
  }

  return (
    <>
    <div className="container">
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
                  <Dropdown.Item href="/add-company" >Add company</Dropdown.Item>
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
  
  <div className="form-wrapper">
                    {
                        Object.keys(validationError).length > 0 && validationError[0] != "Company updated successfully" && (
                            <Grid>
                                <Paper style={{padding :30, width:600, margin:"30px auto"}}>
                            <div className="alert alert-danger">
                                {
                                    Object.entries(validationError).map(([key, value])=>(
                                        <div key={key}>{value}</div>
                                    ))
                                }
                            </div>
                                </Paper>
                            </Grid>)
                    }
                    {
                        Object.keys(validationError).length > 0 && validationError[0] == "Company updated successfully" && (
                            <Grid>
                                <Paper style={{padding :30, width:600, margin:"30px auto"}}>
                                    <div className="alert alert-success">
                                        {
                                            Object.entries(validationError).map(([key, value])=>(
                                                <div key={key}>{value}</div>
                                            ))
                                        }
                                    </div>
                                </Paper>
                            </Grid>)
                    }
                </div>
    

                <Form onSubmit={updateProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={company} onChange={(event)=>{
                              setCompany(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" value={code} onChange={(event)=>{
                              setCode(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>PVM</Form.Label>
                            <Form.Control type="text" value={vat} onChange={(event)=>{
                              setVat(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={address} onChange={(event)=>{
                              setAddress(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Ceo</Form.Label>
                            <Form.Control type="text" value={director} onChange={(event)=>{
                              setDirector(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={description} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row>
                      <Col>
                        <Form.Group className="mt-2">
                            <FormControl fullWidth>
                                            <select
                                                style={{ height:'30px',borderTop:'none', backgroundColor:'#fff'}}
                                                type="text" value={category_id} onChange={(event)=>{
                                                setCategory_id(event.target.value)
                                            }}
                                            >
                                                <option value="" selected disabled></option>
                                                {(categories.data.length)? categories.data.map((w)=><Category key={w.id} id={w.id} category={w.category}/>):null}
                                            </select>
                            </FormControl>
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row className='invisible'> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>User</Form.Label>
                            <Form.Control type="text" value={user_id.id} onChange={(event)=>{
                              setUser_id(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
              
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
      </div>
   </> 
  )
}
