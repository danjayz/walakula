import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5004/api/auth/register",
                { username, email, password },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 201) {
                navigate("/login");
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred during registration.");
        }
    };

    return (
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
                    Register
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
                        label="User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    >
                        Register
                    </Button>
                </form>

                <Box sx={{ marginTop: 2, textAlign: "center" }}>
                    <Typography variant="body2">
                        Already have an account?{" "}
                        <Button
                            color="secondary"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
