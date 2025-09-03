const express = require('express');
const router = express.Router();
const Booking = require('../Models/Booking');

// POST /api/book
router.post('/book', async (req, res) => {
  try {
    // 👇 Print the full body received
    console.log("📩 Raw Body Received:", JSON.stringify(req.body, null, 2));

    const { type, customerName, customerPhone, payment, stayDetails, activityDetails } = req.body;

    // ✅ Common validation
    if (!type || !customerName || !customerPhone || !payment || !payment.method) {
      console.log("❌ Validation failed:", { type, customerName, customerPhone, payment });
      return res.status(400).json({ error: "Missing required fields" });
    }

    let bookingData = {
      type,
      customerName,
      customerPhone,
      payment,
      stayDetails,
      activityDetails
    };

    // ✅ Handle staying booking
    if (type === "staying") {
      if (!stayDetails) {
        return res.status(400).json({ error: "Stay details are required for staying booking" });
      }
      bookingData.stayDetails = stayDetails;
    }

    // ✅ Handle activity booking
    if (type === "activity") {
      if (!activityDetails) {
        return res.status(400).json({ error: "Activity details are required for activity booking" });
      }
      bookingData.activityDetails = activityDetails;
    }

    const booking = new Booking(bookingData);

    // save to DB (uncomment when DB ready)
    // await booking.save();

    console.log("✅ Validation passed, booking created:", bookingData);

    res.status(201).json({
      message: `${type} booking successful`,
      booking
    });

  } catch (err) {
    console.error("🔥 Server error:", err);
    res.status(500).json({ error: "Server error while booking" });
  }
});

module.exports = router;
