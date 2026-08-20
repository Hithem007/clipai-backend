const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const healthRoutes = require('./routes/health');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const videosRoutes = require('./routes/videos');
const jobsRoutes = require('./routes/jobs');

// Use routes
app.use('/health', healthRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/jobs', jobsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
