// src/services/fileService.ts
import axios from "axios";

export const uploadFile = (formData: FormData, token: string) =>
    axios.post("http://localhost:5004/api/files/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });

export const deleteFile = (fileId: string, token: string) =>
    axios.delete(`http://localhost:5004/api/files/${fileId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
