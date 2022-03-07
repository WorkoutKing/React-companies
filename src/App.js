import {BrowserRouter as Router, Routes, Route,Switch } from "react-router-dom";
import Main from "./components/Main";
import MoreInfo from "./components/MoreInfo";
import Login from './components/Login';
import Signup from "./components/Singup";
import AddCompany from "./components/AddCompany";
import UserCompany from "./components/UserCompany";



const App  = ()=>{
    return(
        <div className="container">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route path="/company/:id" element={<MoreInfo/>}/>
                    <Route path="/Signup" element={<Signup/>} />
                    <Route path="/add-company" element={<AddCompany/>} />
                    <Route path="/Login" element={<Login/>} />
                    <Route path="/user-company" element={<UserCompany/>} />
                </Routes>

            </Router>
        </div>
    )

}
export default App;