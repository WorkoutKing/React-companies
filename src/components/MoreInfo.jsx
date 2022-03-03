import {Link, useParams} from "react-router-dom";
import {Card, Container} from "react-bootstrap";
import { useState, useEffect } from "react";
const MoreInfo = ()=>{
    const {id} = useParams();
    const[company, setCompany] = useState({
        data: ""
    })
    const url = 'https://laravel.ddev.site/api/company/';
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
        <Container>
            <Card style={{ width: '25rem' }}>
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
            <div ><Link to={`/`} style={{backgroundColor: "lightblue"}}>Home</Link></div>
        </Container>
    )
}
export default MoreInfo