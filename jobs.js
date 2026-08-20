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
    createdAt: new Date(),
    creatorId: 'creator1'
  },
  'job2': {
    id: 'job2',
    title: 'Tutorial Shorts',
    description: '10 YouTube Shorts from tutorial video',
    budget: 75,
    clipsNeeded: 10,
    bids: [],
    status: 'open',
    createdAt: new Date(),
    creatorId: 'creator1'
  },
  'job3': {
    id: 'job3',
    title: 'Promo Reels',
    description: '8 promotional reels for social media',
    budget: 100,
    clipsNeeded: 8,
    bids: [],
    status: 'open',
    createdAt: new Date(),
    creatorId: 'creator1'
  }
};

router.get('/open', (req, res) => {
  const openJobs = Object.values(jobs).filter(job => job.status === 'open');
  res.json(openJobs);
});

router.get('/:jobId', (req, res) => {
  const job = jobs[req.params.jobId];
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

router.post('/:jobId/bid', (req, res) => {
  const job = jobs[req.params.jobId];
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const bid = {
    id: Date.now().toString(),
    clipperId: req.body?.clipperId,
    clipperName: req.body?.clipperName,
    bidAmount: req.body?.bidAmount,
    status: 'pending',
    createdAt: new Date()
  };

  job.bids.push(bid);
  res.json({ success: true, message: 'Bid placed', bidId: bid.id });
});

router.post('/:jobId/payment', (req, res) => {
  const job = jobs[req.params.jobId];
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json({
    success: true,
    message: 'Payment created',
    paymentId: Date.now().toString(),
    amount: req.body?.bidAmount,
    currency: 'usd'
  });
});

router.post('/create', (req, res) => {
  const creatorId = req.body?.creatorId;
  const title = req.body?.title;
  const budget = req.body?.budget;

  if (!creatorId || !title || !budget) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const jobId = 'job' + Date.now();
  const newJob = {
    id: jobId,
    creatorId,
    title,
    description: req.body?.description || '',
    budget,
    clipsNeeded: req.body?.clipsNeeded || 5,
    bids: [],
    status: 'open',
    createdAt: new Date()
  };

  jobs[jobId] = newJob;
  res.json({ success: true, message: 'Job created', jobId });
});

module.exports = router;
