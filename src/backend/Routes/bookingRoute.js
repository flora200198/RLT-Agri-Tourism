const express = require('express');
const router = express.Router();
const Booking = require('../Models/Booking');
const { validateAndCalculate } = require('../services/bookingservice');

const bookings =[];

router.post('/book', async (req, res) => {
  try {
    const { type, customerName, customerPhone, payment, details } = req.body;

    if (!type || !customerName || !customerPhone || !payment || !details) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let computedDetails;
    try {
      computedDetails = validateAndCalculate(type, details);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const booking = new Booking({
      type,
      customerName,
      customerPhone,
      payment,
      details: computedDetails,
      totalAmount: computedDetails.total,
      status: "pending"
    });

    // await booking.save();
    bookings.push(booking);

    res.status(201).json({
      message: `${type} booking successful`,
      bookingId: booking._id,
      totalAmount: computedDetails.total,
      booking
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while booking" });
  }
});

module.exports = router;
