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

// Get files
exports.getFiles = async (req, res) => {
    const files = await File.find({ userId: req.user }).sort({
        uploadedAt: -1,
    });
    res.json(files);
};
