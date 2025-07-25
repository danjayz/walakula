import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    CircularProgress,
} from "@mui/material";
import { useUser } from "../contexts/UserContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5004/api/auth/login",
                { username, password },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200) {
                login(response.data.token);
                navigate("/dashboard");
            } else {
                setError(
                    response.data.message ||
                        "Login failed. Please check your credentials."
                );
            }
        } catch (error) {
            setError("Login failed. Please check your credentials.");
        }
        setLoading(false);
    };

    return (
        <div>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 2,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h5" component="h2" gutterBottom>
                        Login
                    </Typography>

                    {error && (
                        <Typography
                            color="error"
                            variant="body2"
                            sx={{ marginBottom: 2 }}
                        >
                            {error}
                        </Typography>
                    )}

                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <TextField
                            label="Username"
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>

                    <Box sx={{ marginTop: 2, textAlign: "center" }}>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Button
                                color="secondary"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Login;
