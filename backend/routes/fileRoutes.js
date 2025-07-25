const express = require("express");
const router = express.Router();
const {
    uploadFile,
    getFiles,
    deleteFile,
} = require("../controllers/fileController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/upload", authMiddleware, uploadFile);
router.delete("/:fileId", authMiddleware, deleteFile);
router.get("/", authMiddleware, getFiles);

module.exports = router;
