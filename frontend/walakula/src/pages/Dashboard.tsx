import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

function Dashboard() {
    const [files, setFiles] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchFiles();
        }
    }, [navigate]);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5004/api/files",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.status === 200) {
                setFiles(response.data);
            } else {
                console.error("Failed to fetch files");
            }
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFiles(selectedFile);
        }
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!files) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", files);

        try {
            setUploading(true);
            setError(null);

            const response = await axios.post(
                "http://localhost:5004/api/files/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.status === 201) {
                setFiles(null);
                fetchFiles();
            } else {
                setError(
                    response.data.error ||
                        "File upload failed. Please try again."
                );
            }
        } catch (error) {
            setError("An error occurred while uploading the file.");
        } finally {
            setUploading(false);
        }
    };

    const handleFileDelete = async (fileId: string) => {
        try {
            await axios.delete(`http://localhost:5004/api/files/${fileId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            fetchFiles();
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Box component="form" onSubmit={handleFileUpload} sx={{ mb: 4 }}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*, .pdf, .docx" // You can restrict file types here
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                    disabled={uploading || !files}
                >
                    {uploading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Upload File"
                    )}
                </Button>
            </Box>

            {error && <Typography color="error">{error}</Typography>}

            <Typography variant="h6" sx={{ mb: 2 }}>
                Your Files
            </Typography>
            <Box>
                {!files && <Typography>No files uploaded yet</Typography>}
                {Array.isArray(files) &&
                    files.map((file) => (
                        <Box
                            key={file._id}
                            sx={{
                                bofilesrder: "1px solid #ddd",
                                padding: 2,
                                mb: 2,
                            }}
                        >
                            <Typography>{file.originalName}</Typography>
                            <Button
                                variant="contained"
                                href={`http://localhost:5004/${file.fileName}`}
                                download
                            >
                                Download
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleFileDelete(file._id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    ))}
            </Box>
        </div>
    );
}

export default Dashboard;
