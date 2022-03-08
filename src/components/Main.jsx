import { Table } from "react-bootstrap";
import {Container, Navbar, Nav, Dropdown, ButtonGroup} from "react-bootstrap";
import { useState, useEffect } from "react";
import RenderCompanies from "./RenderCompanies";
import { Button} from '@material-ui/core'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Footer from "./Footer";

const Main = ()=>{
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const {users} = useParams();  
    let history = useNavigate();

    const user = localStorage.getItem("users");      
    const logout = () => 
    {
        localStorage.removeItem("users")
        history("/login");
    }
    const[companies, setCompanies] = useState("")

    useEffect(()=>{
        fetchCompanies() 
    },[])

    const fetchCompanies = async () => {
        await axios.get('http://laravel.ddev.site/api/companies').then(response=>{
            setCompanies(response.data);
            console.log(response.data);
        },[setCompanies])
    }
    
    
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
            <Footer/>
            </Container>
        </>
    )
}
export default Main