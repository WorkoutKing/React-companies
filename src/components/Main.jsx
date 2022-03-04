import { Table } from "react-bootstrap";
import {Container, Navbar, Nav, NavDropdown, Dropdown, ButtonGroup, DropdownButton} from "react-bootstrap";
import { useState, useEffect } from "react";
import RenderCompanies from "./RenderCompanies";
import { Grid, Button,Link as Nv } from '@material-ui/core'
import { useNavigate, useParams } from "react-router-dom";


const Main = ()=>{
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#3370bd'}
 
    const {users} = useParams();  
    let history = useNavigate(); 
 
    const user = localStorage.getItem('users');
    console.log(user);
      
    const logout = () => 
    {
        localStorage.removeItem("users")
        history("/login");
    }
    const[companies, setCompanies] = useState("")
    useEffect(()=>{
        fetch('http://laravel.ddev.site/api/companies')
            .then(response => response.json())
            .then(data=>{
                setCompanies(data)
                console.log(data)
            })
            .catch(error => {
                throw(error);
            })
    },[setCompanies])
    return(
        <>
        <Container>
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
                            <Dropdown.Item href="/" onClick={logout}>Logout</Dropdown.Item>
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
            
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Code</th>
                        <th>Address</th>
                        <th>Director</th>
                        <th>More...</th>
                    </tr>
                    </thead>
                    <tbody>
                            {(companies.data)?companies.data.map((w)=><RenderCompanies key={w.id} id={w.id} code={w.code} company={w.company} address={w.address} director={w.director}/>):null}
                    </tbody>
                </Table>
            
            </Container>
        </>
    )
}
export default Main