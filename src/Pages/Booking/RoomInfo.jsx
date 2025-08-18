// src/modules/booking/RoomsStep.jsx
import React from "react";

export default function RoomsStep({ date, rooms, selectedRoomId, onSelectRoom, onBack, onNext }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Available Rooms on <span className="text-primary">{date}</span></h5>
          <button className="btn btn-link" onClick={onBack}>Change date</button>
        </div>

        <div className="row g-3">
          {rooms.map((r) => (
            <div className="col-12" key={r._id}>
              <div className={`border rounded-3 p-3 d-flex flex-wrap align-items-center justify-content-between ${r.soldOut ? "bg-light" : ""}`}>
                <div className="me-3">
                  <h6 className="mb-1">{r.name}</h6>
                  <div className="small text-muted">Sleeps {r.capacity} · ₹{r.price.toLocaleString()} / night</div>
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {r.amenities?.slice(0, 4).map((a) => (
                      <span key={a} className="badge text-bg-secondary">{a}</span>
                    ))}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 mt-3 mt-sm-0">
                  {r.soldOut ? (
                    <span className="badge text-bg-danger">Sold Out</span>
                  ) : (
                    <button
                      className={`btn ${selectedRoomId === r._id ? "btn-success" : "btn-outline-primary"}`}
                      onClick={() => onSelectRoom(r._id)}
                    >
                      {selectedRoomId === r._id ? "Selected" : "Select"}
                    </button>
                  )}
                </div>
              </div>
              {selectedRoomId === r._id && (
                <div className="mt-3 ms-2">
                  <h6 className="mb-2">Amenities</h6>
                  <ul className="mb-3">
                    {r.amenities?.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                  <h6 className="mb-2">House Rules</h6>
                  <ul className="mb-3">
                    {r.policies?.houseRules?.map((rule, idx) => <li key={idx}>{rule}</li>)}
                  </ul>
                  {r.policies?.cancellation && (
                    <div className="alert alert-warning">
                      <strong>Cancellation:</strong> Cancel up to {r.policies.cancellation.windowHours}h before for {r.policies.cancellation.refundPercent}% refund. {r.policies.cancellation.note}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-primary" disabled={!selectedRoomId} onClick={onNext}>Continue</button>
        </div>
      </div>
    </div>
  );
}
