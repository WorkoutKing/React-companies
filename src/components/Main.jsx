import { Table } from "react-bootstrap";
import {Container, Row,Col} from "react-bootstrap";
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
        fetch('https://laravel.ddev.site/api/companies')
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
              <Row>
             <Col><h4>{user}</h4></Col>          
               <Col><Button type='submit' className='mt-3' onClick={logout} color='primary' variant="contained"  style={{textAlign: 'right'}}>Logout</Button></Col>
            </Row>
            ) : (
                <div style={{textAlign: 'right'}} className=''>
                    <a className="btn btn-primary m-2" href="/signup">Register</a>
                    <a className="btn btn-primary" href="/login">Login</a>
                </div>

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