import {Link} from "react-router-dom";

const RenderCompanies = (props)=>{

    return(
        <>
            <tr>
                <td>{props.company}</td>
                <td>{props.code}</td>
                <td>{props.address}</td>
                <td>{props.director}</td>
                <td><Link to={`/company/${props.id}`}>More...</Link> </td>
            </tr>

        </>
    )
}
export default RenderCompanies