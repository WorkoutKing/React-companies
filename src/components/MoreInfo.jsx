import {useNavigate, useParams} from "react-router-dom";
import {Card, Container} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Navbar,Nav,Dropdown, ButtonGroup} from "react-bootstrap";
import Footer from "./Footer";

const MoreInfo = ()=>{
    const {id} = useParams();
    const user = localStorage.getItem("users");
    let history = useNavigate(); 
    const[company, setCompany] = useState({
        data: ""
    })
    const logout = () => 
    {
        localStorage.removeItem("users")
        history("/login");
    }
    const url = 'http://laravel.ddev.site/api/company/';
      useEffect(()=>{
          fetch(`${url}${id}`)
              .then(response => response.json())
              .then(data=>{
                  setCompany(data)
              })
              .catch(error => {
                  throw(error);
              })
      },[setCompany, id])
    return(
        <>
        <Container>
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
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>{company.data.company}</Card.Title>
                    <Card.Text>
                        <div>Code: {company.data.code}</div>
                        <div>VAT: {company.data.vat}</div>
                        <div>Address: {company.data.address}</div>
                        <div>Director: {company.data.director}</div>
                    </Card.Text>
                    <Card.Footer style={{background: "lightyellow"}}>
                        <div>{company.data.description}</div>
                    </Card.Footer>
                </Card.Body>
            </Card>
            <Footer/>
        </Container>
        </>
    )
}
export default MoreInfo