import {Link} from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate} from "react-router-dom";


const userid= localStorage.getItem("usersid");

const RenderMyCompanies = (props)=>{
    let history = useNavigate();

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://laravel.ddev.site/api/delete-company/${id}`).then(({data})=>{
              console.log(data);
            Swal.fire({
                icon:"success",
                text:data.message
            })
            window.location.reload();
        })
    }

    return(
        <>
        {userid == props.user_id.id ? (
            <tr>
                <td>{props.company}</td>
                <td>{props.code}</td>
                <td>{props.address}</td>
                <td>{props.director}</td>
                <td> <Link to={`/update/${props.id}`}><UpdateIcon color="success"/></Link></td> 
                <td><a className="" onClick={()=>deleteProduct(props.id)}><DeleteForeverIcon sx={{ color:'red' }} /></a></td>
            </tr>
        ):(
            <div></div>
        )}
        </>
    )
}
export default RenderMyCompanies