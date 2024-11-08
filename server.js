// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Endpoint for uploading images
app.post('/upload', upload.single('photo'), (req, res) => {
    res.json({ path: `/uploads/${req.file.filename}` });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
