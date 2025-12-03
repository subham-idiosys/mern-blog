require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

// Import routes
const postRoutes = require('./routes/post');
const { connect } = require('./config/database');
// Connect to the database
connect();
// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

// Routes
app.use('/api/v1/admin/posts', postRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
