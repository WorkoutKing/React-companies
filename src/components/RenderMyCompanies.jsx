import {Link} from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';

const userid= localStorage.getItem("usersid");

const RenderMyCompanies = (props)=>{
    return(
        <>
        {userid == props.user_id.id ? (
            <tr>
                <td>{props.company}</td>
                <td>{props.code}</td>
                <td>{props.address}</td>
                <td>{props.director}</td>
                <td> <a href='/'><UpdateIcon color="success"/></a></td> 
                <td><a href='/'><DeleteForeverIcon sx={{ color:'red' }} /></a></td>
            </tr>
        ):(
            <div></div>
        )}
        </>
    )
}
export default RenderMyCompanies