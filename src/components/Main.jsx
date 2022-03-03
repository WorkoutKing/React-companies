import { Table } from "react-bootstrap";
import {Container} from "react-bootstrap";
import { useState, useEffect } from "react";
import RenderCompanies from "./RenderCompanies";


const Main = ()=>{
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