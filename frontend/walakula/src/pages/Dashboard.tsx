import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

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
                setFiles(response.data.files);
            } else {
                console.error("Failed to fetch files");
            }
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    return <div>Dashboard</div>;
}

export default Dashboard;
