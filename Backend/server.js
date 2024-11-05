const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors()); // Allows all origins; customize this in production

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Route to serve the registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Change 'index.html' to your actual HTML file name if different
});

// Route to handle form submission
app.post('/register-bus-user', (req, res) => {
    // Handle registration data
    const userData = req.body;
    
    // Example: log the user data
    console.log('User Data:', userData);
    
    // Respond with a success message
    res.status(200).json({ message: 'User registered successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
