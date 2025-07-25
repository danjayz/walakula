import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                {!isLoggedIn && (
                    <>
                        <Button
                            color="inherit"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </Button>
                    </>
                )}
                {isLoggedIn && (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
