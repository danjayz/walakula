import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "../../walakula/src/pages/Register";
import Login from "../../walakula/src/pages/Login";
import Dashboard from "../../walakula/src/pages/Dashboard";
import { UserProvider } from "./contexts/UserContext";

function App() {
    return (
        <UserProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
