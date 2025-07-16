const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
