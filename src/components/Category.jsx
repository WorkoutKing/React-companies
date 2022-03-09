import {MenuItem} from "@material-ui/core";

const Category = (props) =>{
    return (

        <option value={props.id}>{props.category}</option>
    )
}
export default Category