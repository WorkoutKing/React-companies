import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import MoreInfo from "./components/MoreInfo";
const App  = ()=>{
    return(
        <div className="container">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route path="/company/:id" element={<MoreInfo/>}/>
                </Routes>

            </Router>
        </div>
    )

}
export default App;