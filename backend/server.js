const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
