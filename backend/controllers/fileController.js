const File = require("../models/File");
const fs = require("fs");

// Upload a file
exports.uploadFile = async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;
    const uploadFilePath = `uploads/${Date.now()}_${file.name}`;

    file.mv(uploadFilePath, async (error) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        const newFile = await File.create({
            fileName: uploadFilePath,
            originalName: file.name,
            userId: req.user,
            size: file.size,
        });

        res.json({
            message: "File uploaded successfully",
            file: newFile,
            status: 201,
        });
    });
};

// Delete a file
exports.deleteFile = async (req, res) => {
    const fileId = req.params.fileId;

    const file = await File.findById(fileId);
    if (!file) {
        return res.status(404).json({ error: "File not found" });
    }

    // delete the file from the filesystem
    const filePath = file.fileName;
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete file" });
        }
    });

    await file.deleteOne();
    res.json({ message: "File deleted successfully" });
};

// Get files
exports.getFiles = async (req, res) => {
    const files = await File.find({ userId: req.user }).sort({
        uploadedAt: -1,
    });
    res.json(files);
};
