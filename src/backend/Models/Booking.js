const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ["stay", "adventure"]  // match frontend
  },

  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },

  // Payment Info
  payment: {
    status: { type: String, enum: ["paid", "pending"], required: true },
    method: { type: String, enum: ["upi", "credit_card", "debit_card", "cash"], required: true },
    transactionId: { type: String },

    // Optional fields
    upiId: { type: String },
    cardLast4: { type: String },
    cardHolderName: { type: String },
    expiryMonth: { type: Number },
    expiryYear: { type: Number }
  },

  // Adventure Booking
  adventureDetails: {
    activity: { type: String }, // farm, swimming, etc.
    participants: { type: Number },
    date: { type: Date },
    timeSlot: { type: String }
  },

  // Stay Booking
  stayDetails: {
    roomType: { type: String },
    rooms: { type: Number },
    adults: { type: Number },
    kids: { type: Number },
    infants: { type: Number },
    checkIn: { type: Date },
    checkOut: { type: Date }
  },

  // Common
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "pending" },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
