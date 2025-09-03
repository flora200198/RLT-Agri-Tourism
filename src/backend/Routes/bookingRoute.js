const express = require('express');
const router = express.Router();
const Booking = require('../Models/Booking');

// POST /api/book
router.post('/book', async (req, res) => {
  try {
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

    // ✅ Handle staying booking with date/time validation
    if (type === "staying") {
      if (!stayDetails) {
        return res.status(400).json({ error: "Stay details are required for staying booking" });
      }

      const { checkinDate, checkoutDate } = stayDetails;

      if (!checkinDate || !checkoutDate) {
        return res.status(400).json({ error: "Check-in and checkout dates are required" });
      }

      const now = new Date();
      const checkin = new Date(checkinDate);
      const checkout = new Date(checkoutDate);

      // Force check-in & checkout to 12:00
      if (checkin.getHours() !== 12 || checkin.getMinutes() !== 0) {
        return res.status(400).json({ error: "Check-in time must be 12:00 PM" });
      }
      if (checkout.getHours() !== 12 || checkout.getMinutes() !== 0) {
        return res.status(400).json({ error: "Checkout time must be 12:00 PM" });
      }

      // Disallow past dates
      if (checkin < now) {
        return res.status(400).json({ error: "You cannot book for past dates" });
      }

      // If booking today, only allow before 12:00
      const today = new Date();
      const isSameDay =
        checkin.getFullYear() === today.getFullYear() &&
        checkin.getMonth() === today.getMonth() &&
        checkin.getDate() === today.getDate();

      if (isSameDay) {
        if (now.getHours() >= 12) {
          return res.status(400).json({ error: "Same-day booking is closed after 12:00 PM" });
        }
      }

      // Checkout must be after check-in
      if (checkout <= checkin) {
        return res.status(400).json({ error: "Checkout date must be after check-in date" });
      }

      bookingData.stayDetails = stayDetails;
    }

    // ✅ Handle activity booking with date/time validation
    if (type === "activity") {
      if (!activityDetails) {
        return res.status(400).json({ error: "Activity details are required for activity booking" });
      }

      const { date, time } = activityDetails;

      if (!date || !time) {
        return res.status(400).json({ error: "Activity date and time are required" });
      }

      const now = new Date();
      const activityDateTime = new Date(`${date}T${time}:00`); // combine date + time

      // Disallow past date/time
      if (activityDateTime <= now) {
        return res.status(400).json({ error: "You cannot book an activity in the past" });
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
