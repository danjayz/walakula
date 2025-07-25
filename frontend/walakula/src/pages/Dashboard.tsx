import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
import FileTable from "../components/FileTable";
import axios from "axios";

function Dashboard() {
    const [files, setFiles] = useState<any[]>([]); // For fetched files
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // For upload
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
                setFiles(response.data || []);
            } else {
                console.error("Failed to fetch files");
            }
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

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
                setSelectedFile(null);
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
                    disabled={uploading || !selectedFile}
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
            <FileTable files={files} handleFileDelete={handleFileDelete} />
        </div>
    );
}

export default Dashboard;
