const express = require('express');
const router = express.Router();

let videos = {};

router.post('/create', (req, res) => {
  const uid = req.body?.uid;
  const title = req.body?.title;
  const videoUrl = req.body?.videoUrl;

  if (!uid || !title || !videoUrl) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const videoId = Date.now().toString();
  videos[videoId] = { id: videoId, uid, title, videoUrl, createdAt: new Date() };

  res.json({ success: true, message: 'Video recorded', videoId });
});

router.get('/user/:uid', (req, res) => {
  const userVideos = Object.values(videos).filter(v => v.uid === req.params.uid);
  res.json(userVideos);
});

module.exports = router;
