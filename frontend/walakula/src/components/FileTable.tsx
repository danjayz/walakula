import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

type File = {
    fileName: string;
    originalName: string;
    size: number;
    uploadedAt: string;
    _id: string;
};

interface FileTableProps {
    files: File[] | null;
    handleFileDelete: (fileId: string) => void;
}

const FileTable: React.FC<FileTableProps> = ({ files, handleFileDelete }) => (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Last Modified</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(files ?? []).map((file) => (
                    <TableRow
                        key={file._id}
                        sx={{
                            "&:last-child td, &:last-child th": {
                                border: 0,
                            },
                        }}
                    >
                        <TableCell component="th" scope="row">
                            {file.originalName}
                        </TableCell>
                        <TableCell>{file.size} bytes</TableCell>
                        <TableCell>
                            {new Date(file.uploadedAt).toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
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
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default FileTable;
