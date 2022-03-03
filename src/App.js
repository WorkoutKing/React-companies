import {BrowserRouter as Router, Routes, Route,Switch } from "react-router-dom";
import Main from "./components/Main";
import MoreInfo from "./components/MoreInfo";
import Login from './components/Login';
import Signup from "./components/Singup";



const App  = ()=>{
    return(
        <div className="container">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route path="/company/:id" element={<MoreInfo/>}/>
                    <Route path="/Signup" element={<Signup/>} />

                    <Route path="/Login" element={<Login/>} />
                </Routes>

            </Router>
        </div>
    )

}
export default App;