const express = require('express');
const router = express.Router();
const Booking = require('../Models/Booking');

let stayBookings = [];

// POST /api/staying/book
router.post('/book', async (req, res) => {
  try {
    const { customerName, customerPhone, payment, stayDetails } = req.body;

    if (!customerName || !customerPhone || !payment || !stayDetails) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    const booking = new Booking({
      type: "staying",
      customerName,
      customerPhone,
      payment,
      stayDetails
    });
    stayBookings.push(booking);
    // await booking.save();
    res.status(201).json({ message: "Staying booking successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while booking stay" });
  }
});

module.exports = router;
