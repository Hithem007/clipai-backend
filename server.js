const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Jobs
let jobs = {
  'job1': { id: 'job1', title: 'Podcast Clips', budget: 50, clipsNeeded: 5, bids: [], status: 'open' },
  'job2': { id: 'job2', title: 'Tutorial Shorts', budget: 75, clipsNeeded: 10, bids: [], status: 'open' },
  'job3': { id: 'job3', title: 'Promo Reels', budget: 100, clipsNeeded: 8, bids: [], status: 'open' }
};

app.get('/api/jobs/open', (req, res) => {
  res.json(Object.values(jobs));
});

app.post('/api/jobs/create', (req, res) => {
  const jobId = 'job' + Date.now();
  jobs[jobId] = { id: jobId, ...req.body, bids: [], status: 'open' };
  res.json({ success: true, jobId });
});

app.post('/api/jobs/:jobId/bid', (req, res) => {
  res.json({ success: true });
});

// Videos
app.post('/api/videos/create', (req, res) => {
  const { uid, title, videoUrl } = req.body;
  if (!uid || !title || !videoUrl) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  res.json({ success: true, videoId: Date.now().toString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
