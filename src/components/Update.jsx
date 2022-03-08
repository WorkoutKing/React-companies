import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import {Container, Navbar, Nav, NavDropdown, Dropdown, ButtonGroup, DropdownButton} from "react-bootstrap";


export default function Update() {
  
  const userstoken = localStorage.getItem("userstoken");
  console.log(userstoken);
  let history = useNavigate(); 
  const user = localStorage.getItem("users");

  const navigate = useNavigate();

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

  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchProduct()
  },[])

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
    .then(({data})=>{
      Swal.fire({
        title:'SUCCESSFULL UPDATED',
        icon:"success",
        text:data.message
        
      })
      navigate("/user-company")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
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
  
    
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Company:</h4>
              <h5 style={{color:'red'}}>SOMETIMES THERE IS A BUG,WHILE UPDATING EVERY TIME CHANGE ATLEAST ONE LETTER, NUMBER OR CHANGE TO SAME IN EACH FIELD</h5>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
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
                        <Form.Group controlId="Name">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" value={category_id} onChange={(event)=>{
                              setCategory_id(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
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
            </div>
          </div>
        </div>
      </div>
    </div>
   </> 
  )
}
