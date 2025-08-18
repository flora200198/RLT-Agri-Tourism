// src/modules/booking/CalendarStep.jsx
import React from "react";

export default function CalendarStep({ date, setDate, busy, onCheckAvailability }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Choose your date</h5>
        <div className="row g-3 align-items-end">
          <div className="col-sm-6 col-md-4">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div className="col-auto">
            <button disabled={!date || busy} onClick={onCheckAvailability} className="btn btn-primary">
              {busy ? "Checking…" : "Check Availability"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
