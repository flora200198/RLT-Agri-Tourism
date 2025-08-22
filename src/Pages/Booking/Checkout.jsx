// src/modules/booking/CheckoutStep.jsx
import React from "react";
import { isValidEmail, isValidPhone } from "./Validators";

export default function CheckoutStep({
  date,
  room,
  guest,
  setGuest,
  holdId,
  onCreateHold,
  payment,
  setPayment,
  onConfirm,
  confirmRes,
  busy,
  onBack,
  onReset,
  totalPrice,
}) {
  const isConfirmed = !!confirmRes; // check if booking is confirmed

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Checkout</h5>
          {!isConfirmed && (
            <button className="btn btn-link" onClick={onBack}>
              Change room
            </button>
          )}
        </div>

        {/* Summary */}
        <div className="mb-4">
          <div><strong>Date:</strong> {date}</div>
          <div><strong>Room:</strong> {room?.name} (₹{room?.price?.toLocaleString()}/night)</div>
        </div>

        {/* 1) Guest Details */}
        <div className="border rounded-3 p-3 mb-3">
          <h6 className="mb-3">Guest Details</h6>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={guest.name}
                onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                disabled={isConfirmed}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${
                  guest.email && !isValidEmail(guest.email) ? "is-invalid" : ""
                }`}
                value={guest.email}
                onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                disabled={isConfirmed}
              />
              {guest.email && !isValidEmail(guest.email) && (
                <div className="invalid-feedback">Enter a valid email.</div>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className={`form-control ${
                  guest.phone && !isValidPhone(guest.phone) ? "is-invalid" : ""
                }`}
                value={guest.phone}
                onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                disabled={isConfirmed}
              />
              {guest.phone && !isValidPhone(guest.phone) && (
                <div className="invalid-feedback">Enter a valid phone.</div>
              )}
            </div>
          </div>
          {!isConfirmed && (
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-primary"
                disabled={busy || !!holdId}
                onClick={onCreateHold}
              >
                {busy ? "Saving…" : holdId ? "Saved" : "Save & Enable Payment"}
              </button>
            </div>
          )}
        </div>

        {/* 2) Payment */}
        <fieldset className="border rounded-3 p-3 mb-3" disabled={!holdId || isConfirmed}>
          <legend className="float-none w-auto px-2 fs-6">Payment</legend>

          <div className="mb-2">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="pay"
                id="upi"
                value="upi"
                checked={payment.method === "upi"}
                onChange={(e) => setPayment({ ...payment, method: e.target.value })}
                disabled={isConfirmed}
              />
              <label className="form-check-label" htmlFor="upi">UPI</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="pay"
                id="card"
                value="card"
                checked={payment.method === "card"}
                onChange={(e) => setPayment({ ...payment, method: e.target.value })}
                disabled={isConfirmed}
              />
              <label className="form-check-label" htmlFor="card">Credit Card</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="pay"
                id="debit"
                value="debit"
                checked={payment.method === "debit"}
                onChange={(e) => setPayment({ ...payment, method: e.target.value })}
                disabled={isConfirmed}
              />
              <label className="form-check-label" htmlFor="debit">Debit Card</label>
            </div>
          </div>

          {payment.method === "upi" && (
            <div className="col-md-6">
              <label className="form-label">UPI ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="name@bank"
                value={payment.upi}
                onChange={(e) => setPayment({ ...payment, upi: e.target.value })}
                disabled={isConfirmed}
              />
              <div className="form-text">You’ll approve the request in your UPI app (demo).</div>
            </div>
          )}

          {(payment.method === "card" || payment.method === "debit") && (
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={19}
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={payment.cardNo}
                  onChange={(e) => setPayment({ ...payment, cardNo: e.target.value })}
                  disabled={isConfirmed}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Expiry (MM/YY)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  value={payment.expiry}
                  onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                  disabled={isConfirmed}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  maxLength={4}
                  placeholder="***"
                  value={payment.cvv}
                  onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                  disabled={isConfirmed}
                />
              </div>
            </div>
          )}

          {!isConfirmed && (
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-primary"
                disabled={!holdId || busy}
                onClick={onConfirm}
              >
                {busy ? "Processing…" : "Pay & Confirm"}
              </button>
            </div>
          )}
        </fieldset>

        {/* 3) Review & Confirmation */}
        {isConfirmed && (
          <div className="alert alert-success mt-3">
            <h6 className="mb-2">Booking Confirmed 🎉</h6>
            <div className="mb-1"><strong>Date:</strong> {date}</div>
            <div className="mb-1"><strong>Room:</strong> {room?.name}</div>
            <div className="mb-1"><strong>Guest:</strong> {guest.name}</div>
            <div className="mb-1"><strong>Phone:</strong> {guest.phone}</div>
            <div className="mb-1"><strong>Amount Paid:</strong> ₹{totalPrice.toLocaleString()}</div>
            <div className="mb-2"><strong>Reference:</strong> {confirmRes.code}</div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={onReset}>
                Book Another Date
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
