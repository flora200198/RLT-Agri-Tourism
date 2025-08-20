// src/modules/booking/CalendarStep.jsx
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarStep({ date, setDate, busy, onCheckAvailability }) {
  const bookedDates = ["2025-08-22", "2025-08-24"]; 

  // disable booked dates
  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      return bookedDates.includes(dateStr);
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
          minDate={new Date()}
        />

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