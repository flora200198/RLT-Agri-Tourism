const express = require('express');
const router = express.Router();

let contacts = []; // temporary in-memory storage

router.post('/contact', (req, res) => {
  const { name, phone, message } = req.body;

  if (!name || !phone ) {
    return res.status(400).json({ error: "All fields required" });
  }

  const newContact = { id: Date.now(), name, phone, message };
  contacts.push(newContact);
   
  res.status(201).json({ success: true, data: newContact });
});

router.get('/contact', (req, res) => {
  res.json({ contacts });
});

module.exports = router;
