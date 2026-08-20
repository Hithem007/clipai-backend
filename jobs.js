const express = require('express');
const router = express.Router();

let jobs = {
  'job1': {
    id: 'job1',
    title: 'Podcast Clips',
    description: '5 short clips from podcast episode',
    budget: 50,
    clipsNeeded: 5,
    bids: [],
    status: 'open',
    createdAt: new Date()
  },
  'job2': {
    id: 'job2',
    title: 'Tutorial Shorts',
    description: '10 YouTube Shorts from tutorial video',
    budget: 75,
    clipsNeeded: 10,
    bids: [],
    status: 'open',
    createdAt: new Date()
  },
  'job3': {
    id: 'job3',
    title: 'Promo Reels',
    description: '8 promotional reels for social media',
    budget: 100,
    clipsNeeded: 8,
    bids: [],
    status: 'open',
    createdAt: new Date()
  }
};

router.get('/open', (req, res) => {
  res.json(Object.values(jobs));
});

router.get('/:jobId', (req, res) => {
  const job = jobs[req.params.jobId];
  if (!job) return res.status(404).json({ error: 'Not found' });
  res.json(job);
});

router.post('/:jobId/bid', (req, res) => {
  const job = jobs[req.params.jobId];
  if (!job) return res.status(404).json({ error: 'Not found' });
  job.bids.push({ id: Date.now(), clipperId: req.body.clipperId, bidAmount: req.body.bidAmount });
  res.json({ success: true });
});

router.post('/create', (req, res) => {
  const jobId = 'job' + Date.now();
  jobs[jobId] = { id: jobId, ...req.body, bids: [], status: 'open', createdAt: new Date() };
  res.json({ success: true, jobId });
});

module.exports = router;
