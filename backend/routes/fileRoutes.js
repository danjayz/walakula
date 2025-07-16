const express = require("express");
const router = express.Router();
const { uploadFile, getFiles } = require("../controllers/fileController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/upload", authMiddleware, uploadFile);
router.get("/", authMiddleware, getFiles);

module.exports = router;
