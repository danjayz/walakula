import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../../walakula/src/pages/Register";
import Login from "../../walakula/src/pages/Login";
import Dashboard from "../../walakula/src/pages/Dashboard";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
