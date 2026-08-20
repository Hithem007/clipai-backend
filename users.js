const express = require('express');
const router = express.Router();

let users = {};

router.post('/create', (req, res) => {
  const uid = req.body?.uid;
  const email = req.body?.email;
  const name = req.body?.name;

  if (!uid || !email) {
    return res.status(400).json({ error: 'Missing uid or email' });
  }

  users[uid] = { uid, email, name };
  res.json({ success: true, message: 'User created' });
});

router.get('/:uid', (req, res) => {
  const user = users[req.params.uid];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

module.exports = router;
