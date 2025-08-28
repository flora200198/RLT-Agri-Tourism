// const express = require('express');
// const router = express.Router();
// const Contact = require('../Models/Contact.model');

// // POST /api/contact
// router.post('/contact', async (req, res) => {
//   try {
//     const { name, phone, message } = req.body;

//     // Validation
//     if (!name || !phone) {
//       return res.status(400).json({ ok: false, message: 'Name and Phone are required' });
//     }

//     // Save to DB
//     const contact = new Contact({ name, phone, message });
//     await contact.save();

//     console.log("✅ Contact saved:", contact);

//     res.status(201).json({ ok: true, message: 'Contact submitted successfully' });
//   } catch (error) {
//     console.error("❌ Error saving contact:", error);
//     res.status(500).json({ ok: false, message: 'Internal Server Error' });
//   }
// });

// module.exports = router;


// Routes/Contact.js
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
