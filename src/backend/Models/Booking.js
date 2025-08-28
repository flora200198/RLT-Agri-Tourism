const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  type: { type: String, required: true, enum: ["activity", "staying"] }, 
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },

  // Payment Info
  payment: {
    method: { type: String, enum: ["upi", "credit_card", "debit_card"], required: true },
    transactionId: { type: String },

    upiId: { type: String },

    cardLast4: { type: String },
    cardHolderName: { type: String },
    expiryMonth: { type: Number },
    expiryYear: { type: Number }
  },

  // Activity Booking
  activityDetails: {
    activityName: { type: String },
    guestsCount: { type: Number },
    date: { type: Date },
    time: { type: String }
  },

  // Staying Booking
  stayDetails: {
    roomType: { type: String },
    adultsCount: { type: Number },
    childrenCount: { type: Number },
    totalGuests: { type: Number },
    checkinDate: { type: Date },
    checkoutDate: { type: Date },
    totalAmount: { type: Number },
    gst: { type: Number }
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
