// BookingForm.jsx
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const activitySlots = {
  farm: ["10:00 AM - 5:30 PM"],
  bday: ["10:00 AM - 2:00 PM", "3:00 PM - 7:00 PM"],
  swimming: ["10:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"],
  avroom: ["9:00 AM - 1:00 PM", "2:00 PM - 6:00 PM"],
};

const staySlot = ["Check-in 12:00 PM - Check-out 11:00 AM"];
const MAX_PERSONS_PER_ROOM = 3;
const rooms = [
  { name: "Deluxe Room", sleeps: 3, price: 7000, image: "/assets/FarmHouse.png" },
];

const BookingForm = () => {
  const query = new URLSearchParams(useLocation().search);
  const type = query.get("type"); // adventure or stay
  const selectedOption = query.get("option") || ""; // Adventures / Adventures with Stay

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    activity: "",
    slot: "",
    adults: 1,
    kids: 0,
    infants: 0,
    roomCount: 1,
    paymentMethod: "upi",
    upi: "",
    cardNo: "",
    expiry: "",
    cvv: "",
  });

  const [holdId, setHoldId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [confirmRes, setConfirmRes] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Auto-adjust room count if stay selected or "with stay"
  useEffect(() => {
    const totalGuests = Number(formData.adults) + Number(formData.kids);
    const roomsNeeded = Math.ceil(totalGuests / MAX_PERSONS_PER_ROOM) || 1;
    if (type === "stay" || selectedOption === "Adventures with Stay") {
      setFormData((prev) => ({ ...prev, roomCount: roomsNeeded }));
    }
  }, [formData.adults, formData.kids, type, selectedOption]);

  const onCreateHold = () => {
    setBusy(true);
    setTimeout(() => {
      setHoldId("HOLD12345");
      setBusy(false);
    }, 1000);
  };

  const onConfirm = () => {
    setBusy(true);
    setTimeout(() => {
      setConfirmRes({ code: "BOOK12345" });
      setBusy(false);
    }, 1000);
  };

  const totalPersons = Number(formData.adults) + Number(formData.kids);
  const maxExceeded = totalPersons > MAX_PERSONS_PER_ROOM * formData.roomCount;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Booking: {selectedOption}</h2>

      <form className="p-4 border rounded shadow-sm bg-light">
        {/* Adventure selection */}
        {type === "adventure" && (
          <div className="mb-3">
            <label className="form-label">Select Activity</label>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select --</option>
              <option value="farm">One Day Farm Visit</option>
              <option value="bday">Birthday Party (4 hrs)</option>
              <option value="swimming">Swimming Pool with Food (2 hrs)</option>
              <option value="avroom">AV Room with Food (4 hrs)</option>
            </select>
          </div>
        )}

        {/* Guest info */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Adults</label>
            <input
              type="number"
              name="adults"
              min="0"
              value={formData.adults}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Kids</label>
            <input
              type="number"
              name="kids"
              min="0"
              value={formData.kids}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Infants</label>
            <input
              type="number"
              name="infants"
              min="0"
              value={formData.infants}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* Room details if stay or adventure with stay */}
        {(type === "stay" || selectedOption === "Adventures with Stay") && (
          <div className="mb-3">
            <label className="form-label">Room Count</label>
            <input
              type="number"
              name="roomCount"
              value={formData.roomCount}
              readOnly
              className="form-control"
            />
            {maxExceeded && (
              <div className="text-danger mt-1">
                Guest count exceeds room capacity!
              </div>
            )}

            {rooms.map((r, i) => (
              <div className="d-flex align-items-center mt-2" key={i}>
                <img
                  src={r.image}
                  alt={r.name}
                  style={{ width: "100px", borderRadius: "8px", marginRight: "15px" }}
                />
                <div>
                  <strong>{r.name}</strong> - Sleeps {r.sleeps} - ₹{r.price}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Slot selection */}
        <div className="mb-3">
          <label className="form-label">Select Slot</label>
          <select
            name="slot"
            value={formData.slot}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">-- Select Slot --</option>
            {type === "stay" || selectedOption === "Adventures with Stay"
              ? staySlot.map((s, i) => <option key={i} value={s}>{s}</option>)
              : activitySlots[formData.activity]?.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Payment section */}
        <div className="border rounded-3 p-3 mb-3">
          <h6>Payment</h6>
          <div className="mb-2">
            <div className="form-check form-check-inline">
              <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod==="upi"} onChange={handleChange} className="form-check-input" />
              <label className="form-check-label">UPI</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod==="card"} onChange={handleChange} className="form-check-input" />
              <label className="form-check-label">Credit Card</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name="paymentMethod" value="debit" checked={formData.paymentMethod==="debit"} onChange={handleChange} className="form-check-input" />
              <label className="form-check-label">Debit Card</label>
            </div>
          </div>

          {formData.paymentMethod==="upi" && <input type="text" name="upi" placeholder="name@bank" value={formData.upi} onChange={handleChange} className="form-control mb-2" />}
          {(formData.paymentMethod==="card" || formData.paymentMethod==="debit") && (
            <>
              <input type="text" name="cardNo" placeholder="Card Number" value={formData.cardNo} onChange={handleChange} className="form-control mb-2" />
              <input type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} className="form-control mb-2" />
              <input type="password" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} className="form-control mb-2" />
            </>
          )}
        </div>

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-primary" disabled={busy || holdId} onClick={onCreateHold}>
            {busy ? "Saving…" : holdId ? "Saved" : "Save & Enable Payment"}
          </button>
          <button type="button" className="btn btn-success" disabled={!holdId || busy || maxExceeded} onClick={onConfirm}>
            {busy ? "Processing…" : "Pay & Confirm"}
          </button>
        </div>
      </form>

      {confirmRes && (
        <div className="alert alert-success mt-3">
          <h5>Booking Confirmed 🎉</h5>
          <div><strong>Reference:</strong> {confirmRes.code}</div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
