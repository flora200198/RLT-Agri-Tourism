import React, { useEffect, useMemo, useState } from "react";

/**
 * BookingWizard.jsx
 * A complete front-end flow for Farm Stay booking with steps:
 * 1) Pick Date & Check Availability (calendar)
 * 2) Select Room & View Details/Policies
 * 3) Guest Details (name, email, phone)
 * 4) Payment (UPI / Credit / Debit)
 * 5) Review & Confirm (blocks slot)
 *
 * Uses Bootstrap 5 classes. No external UI libs required.
 *
 * Back-end API (you can implement or switch USE_MOCK=true to use mock data):
 *  - GET    /api/rooms?date=YYYY-MM-DD                 -> [{ _id, name, capacity, price, amenities:[], policies:{houseRules:[], cancellation:{}}, soldOut:boolean }]
 *  - POST   /api/booking/hold                          -> { holdId }
 *           body: { date, roomId, guest:{ name, email, phone } }
 *  - POST   /api/booking/confirm                       -> { bookingId, code }
 *           body: { holdId, payment: { method, ref } }
 *  - GET    /api/booking/status?date=YYYY-MM-DD        -> { soldOutRoomIds: [id, ...] }
 *
 * Notes:
 *  - On real back-end, create unique index on bookings: { roomId:1, date:1 } to prevent double-booking.
 *  - Use a separate holds collection with TTL (e.g., 15 min) so abandoned holds auto-release.
 */

const USE_MOCK = true; // set to false when your API is ready

// --------- Mock Data & API Fallback ---------
const MOCK_ROOMS = [
  {
    _id: "r1",
    name: "Coconut Grove Cottage",
    capacity: 3,
    price: 3200,
    amenities: ["Queen Bed", "AC", "Ensuite", "Breakfast"],
    policies: {
      houseRules: [
        "Check-in after 1 PM",
        "No smoking indoors",
        "Quiet hours after 10 PM",
      ],
      cancellation: {
        windowHours: 48,
        refundPercent: 80,
        note: "Free date change once if requested 48h in advance.",
      },
    },
  },
  {
    _id: "r2",
    name: "Mango Orchard Room",
    capacity: 2,
    price: 2600,
    amenities: ["Double Bed", "Fan", "Garden View"],
    policies: {
      houseRules: ["Check-in after 1 PM", "No loud music"],
      cancellation: {
        windowHours: 24,
        refundPercent: 60,
        note: "Contact support for reschedule options.",
      },
    },
  },
  {
    _id: "r3",
    name: "Lotus Pond Suite",
    capacity: 4,
    price: 4200,
    amenities: ["King Bed", "AC", "Private Deck", "Breakfast"],
    policies: {
      houseRules: ["Check-in after 12 PM", "Pets on request"],
      cancellation: {
        windowHours: 72,
        refundPercent: 90,
        note: "Partial refund otherwise.",
      },
    },
  },
];

function mockFetchRooms(date) {
  // Simulate one sold-out room for today to showcase UI
  const today = new Date().toISOString().slice(0, 10);
  return Promise.resolve(
    MOCK_ROOMS.map((r, i) => ({ ...r, soldOut: date === today && i === 1 }))
  ).then((data) => delay(400).then(() => data));
}

function mockHold({ date, roomId, guest }) {
  // In real life you'd validate and store hold with TTL
  if (!date || !roomId || !guest?.name) {
    return Promise.reject(new Error("Missing fields for hold"));
  }
  return delay(500).then(() => ({ holdId: `hold_${Date.now()}` }));
}

function mockConfirm({ holdId, payment }) {
  if (!holdId || !payment?.method) {
    return Promise.reject(new Error("Missing fields for confirm"));
  }
  return delay(800).then(() => ({ bookingId: `bk_${Date.now()}`, code: `GV-${Math.floor(Math.random()*90000+10000)}` }));
}

function delay(ms) { return new Promise((res) => setTimeout(res, ms)); }

// --------- Helpers ---------
const isValidEmail = (v) => /.+@.+\..+/.test(v);
const isValidPhone = (v) => /^\+?\d[\d\s-]{7,14}$/.test(v);

// --------- Component ---------
export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const selectedRoom = useMemo(() => rooms.find((r) => r._id === selectedRoomId), [rooms, selectedRoomId]);

  const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const [holdId, setHoldId] = useState("");

  const [payment, setPayment] = useState({ method: "", upi: "", cardNo: "", expiry: "", cvv: "" });
  const [confirmRes, setConfirmRes] = useState(null);

  // Step 1: Check availability
  const fetchRooms = async () => {
    setError("");
    if (!date) { setError("Please pick a date first."); return; }
    setBusy(true);
    try {
      let data;
      if (USE_MOCK) data = await mockFetchRooms(date);
      else {
        const res = await fetch(`/api/rooms?date=${date}`);
        if (!res.ok) throw new Error("Failed to load rooms");
        data = await res.json();
      }
      setRooms(data);
      setSelectedRoomId("");
      setStep(2);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  // Step 3: Create hold after guest details
  const createHold = async () => {
    setError("");
    if (!selectedRoom) { setError("Select a room first."); return; }
    if (!guest.name || !isValidEmail(guest.email) || !isValidPhone(guest.phone)) {
      setError("Please enter valid name, email and phone.");
      return;
    }
    setBusy(true);
    try {
      let data;
      if (USE_MOCK) data = await mockHold({ date, roomId: selectedRoom._id, guest });
      else {
        const res = await fetch(`/api/booking/hold`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date, roomId: selectedRoom._id, guest }),
        });
        if (!res.ok) throw new Error("Failed to create hold");
        data = await res.json();
      }
      setHoldId(data.holdId);
      setStep(4); // go to payment
    } catch (e) {
      setError(e.message || "Could not hold the room");
    } finally {
      setBusy(false);
    }
  };

  // Step 4 -> 5: Confirm booking
  const confirmBooking = async () => {
    setError("");
    if (!holdId) { setError("Please complete guest details first."); return; }
    if (!payment.method) { setError("Select a payment method."); return; }

    // Very light front-end validation for demo
    if (payment.method === "upi" && !payment.upi) {
      setError("Enter your UPI ID."); return;
    }
    if ((payment.method === "card" || payment.method === "debit") && (!payment.cardNo || !payment.expiry || !payment.cvv)) {
      setError("Enter full card details."); return;
    }

    setBusy(true);
    try {
      let data;
      if (USE_MOCK) data = await mockConfirm({ holdId, payment: { method: payment.method, ref: "MOCK" } });
      else {
        const res = await fetch(`/api/booking/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ holdId, payment: { method: payment.method, ref: "UI" } }),
        });
        if (!res.ok) throw new Error("Failed to confirm booking");
        data = await res.json();
      }
      setConfirmRes(data);
      setStep(5);
    } catch (e) {
      setError(e.message || "Payment/confirmation failed");
    } finally {
      setBusy(false);
    }
  };

  const resetAll = () => {
    setStep(1);
    setDate("");
    setRooms([]);
    setSelectedRoomId("");
    setGuest({ name: "", email: "", phone: "" });
    setPayment({ method: "", upi: "", cardNo: "", expiry: "", cvv: "" });
    setHoldId("");
    setConfirmRes(null);
    setError("");
  };

  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Book Your Farm Stay</h2>

      {/* Stepper */}
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        {[
          "Date",
          "Rooms",
          "Guest",
          "Payment",
          "Review",
        ].map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className={`d-flex align-items-center px-3 py-2 rounded-pill ${active ? "bg-primary text-white" : done ? "bg-success text-white" : "bg-light"}`}>
              <span className="fw-bold me-2">{n}</span> {label}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      {/* STEP 1: DATE */}
      {step === 1 && (
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
                <button disabled={!date || busy} onClick={fetchRooms} className="btn btn-primary">
                  {busy ? "Checking…" : "Check Availability"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: ROOMS */}
      {step === 2 && (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Available Rooms on <span className="text-primary">{date}</span></h5>
              <button className="btn btn-link" onClick={() => setStep(1)}>Change date</button>
            </div>
            <div className="row g-3">
              {rooms.map((r) => (
                <div className="col-12" key={r._id}>
                  <div className={`border rounded-3 p-3 d-flex flex-wrap align-items-center justify-content-between ${r.soldOut ? "bg-light" : ""}`}>
                    <div className="me-3">
                      <h6 className="mb-1">{r.name}</h6>
                      <div className="small text-muted">Sleeps {r.capacity} · ₹{r.price.toLocaleString()} / night</div>
                      <div className="mt-2 d-flex flex-wrap gap-2">
                        {r.amenities?.slice(0,4).map((a) => (
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
                          onClick={() => setSelectedRoomId(r._id)}
                        >
                          {selectedRoomId === r._id ? "Selected" : "Select"}
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Expand details if selected */}
                  {selectedRoomId === r._id && (
                    <div className="mt-3 ms-2">
                      <h6 className="mb-2">Amenities</h6>
                      <ul className="mb-3">
                        {r.amenities?.map((a) => (<li key={a}>{a}</li>))}
                      </ul>
                      <h6 className="mb-2">House Rules</h6>
                      <ul className="mb-3">
                        {r.policies?.houseRules?.map((rule, idx) => (<li key={idx}>{rule}</li>))}
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
              <button disabled={!selectedRoomId} className="btn btn-primary" onClick={() => setStep(3)}>Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: GUEST DETAILS */}
      {step === 3 && (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Guest Details</h5>
              <button className="btn btn-link" onClick={() => setStep(2)}>Change room</button>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={guest.name} onChange={(e)=>setGuest({...guest, name:e.target.value})} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input type="email" className={`form-control ${guest.email && !isValidEmail(guest.email) ? "is-invalid" : ""}`} value={guest.email} onChange={(e)=>setGuest({...guest, email:e.target.value})} />
                {guest.email && !isValidEmail(guest.email) && <div className="invalid-feedback">Enter a valid email.</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">Phone</label>
                <input type="tel" className={`form-control ${guest.phone && !isValidPhone(guest.phone) ? "is-invalid" : ""}`} value={guest.phone} onChange={(e)=>setGuest({...guest, phone:e.target.value})} />
                {guest.phone && !isValidPhone(guest.phone) && <div className="invalid-feedback">Enter a valid phone.</div>}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button disabled={busy} onClick={createHold} className="btn btn-primary">{busy?"Saving…":"Save & Continue to Payment"}</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: PAYMENT */}
      {step === 4 && (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Payment</h5>
              <button className="btn btn-link" onClick={() => setStep(3)}>Edit guest</button>
            </div>

            <div className="row g-3">
              <div className="col-12">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="pay" id="upi" value="upi" checked={payment.method === "upi"} onChange={(e)=>setPayment({ ...payment, method:e.target.value })} />
                  <label className="form-check-label" htmlFor="upi">UPI</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="pay" id="card" value="card" checked={payment.method === "card"} onChange={(e)=>setPayment({ ...payment, method:e.target.value })} />
                  <label className="form-check-label" htmlFor="card">Credit Card</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="pay" id="debit" value="debit" checked={payment.method === "debit"} onChange={(e)=>setPayment({ ...payment, method:e.target.value })} />
                  <label className="form-check-label" htmlFor="debit">Debit Card</label>
                </div>
              </div>

              {payment.method === "upi" && (
                <div className="col-md-6">
                  <label className="form-label">UPI ID</label>
                  <input type="text" className="form-control" placeholder="name@bank" value={payment.upi} onChange={(e)=>setPayment({...payment, upi:e.target.value})} />
                  <div className="form-text">You will be prompted to approve the payment in your UPI app (mocked here).</div>
                </div>
              )}

              {(payment.method === "card" || payment.method === "debit") && (
                <>
                  <div className="col-md-6">
                    <label className="form-label">Card Number</label>
                    <input type="text" className="form-control" maxLength={19} placeholder="XXXX XXXX XXXX XXXX" value={payment.cardNo} onChange={(e)=>setPayment({...payment, cardNo:e.target.value})} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Expiry (MM/YY)</label>
                    <input type="text" className="form-control" placeholder="MM/YY" value={payment.expiry} onChange={(e)=>setPayment({...payment, expiry:e.target.value})} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">CVV</label>
                    <input type="password" className="form-control" maxLength={4} placeholder="***" value={payment.cvv} onChange={(e)=>setPayment({...payment, cvv:e.target.value})} />
                  </div>
                </>
              )}
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button disabled={busy} className="btn btn-primary" onClick={confirmBooking}>{busy?"Processing…":"Pay & Continue"}</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW & CONFIRMATION */}
      {step === 5 && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Booking Confirmed 🎉</h5>
            {confirmRes ? (
              <>
                <p className="mb-1"><strong>Date:</strong> {date}</p>
                <p className="mb-1"><strong>Room:</strong> {selectedRoom?.name}</p>
                <p className="mb-1"><strong>Guest:</strong> {guest.name} ({guest.phone})</p>
                <p className="mb-3"><strong>Reference:</strong> {confirmRes.code}</p>
                <div className="alert alert-success">Your slot is blocked. You will also receive a confirmation via email/SMS (hook your notifications here).</div>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary" onClick={resetAll}>Book Another Date</button>
                </div>
              </>
            ) : (
              <div className="alert alert-danger">We could not load your confirmation details.</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
