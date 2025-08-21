// src/modules/booking/CalendarStep.jsx
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarStep({ date, setDate, busy, onCheckAvailability, bookings =[], }) {
  // total rooms in hotel
  const TOTAL_ROOMS = 3;

  // check how many rooms are booked on a given date
  const getBookedCount = (date) => {
    const dateStr = date.toISOString().split("T")[0];

    // count all bookings matching this date
    const count = bookings.filter((b) => b.date === dateStr).length;
    return count;
  };

  // disable date if all rooms booked
  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const bookedCount = getBookedCount(date);
      return bookedCount >= TOTAL_ROOMS; // disable only if all 3 rooms booked
    }
    return false;
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Choose your date</h5>

        {/* Calendar UI */}
        <Calendar
          onChange={(d) => setDate(d.toISOString().split("T")[0])}
          value={date ? new Date(date) : null}
          tileDisabled={tileDisabled}
          minDate={new Date()} // ✅ only future dates
        />

        {/* show check-in / check-out details */}
        {date && (
          <div className="alert alert-info mt-3">
            <strong>Check-in:</strong> {new Date(date).toDateString()} at 12:00 PM <br />
            <strong>Check-out:</strong>{" "}
            {new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toDateString()} at 12:00 PM
          </div>
        )}

        <div className="mt-3 text-center">
          <button
            disabled={!date || busy}
            onClick={onCheckAvailability}
            className="btn btn-primary"
          >
            {busy ? "Checking…" : "Check Availability"}
          </button>
        </div>
      </div>
    </div>
  );
}
