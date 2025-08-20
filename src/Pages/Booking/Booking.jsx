import React, { useMemo, useState } from "react";
import { fetchRooms, createHold, confirmBooking } from "../Service/Api";
import { isValidEmail, isValidPhone } from "./Validators";
import CalendarStep from "./Availability";
import RoomsStep from "./RoomInfo";
import CheckoutStep from "./Checkout";
import ActivityBooking from "./ActivityBooking";

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

  async function handleCheckAvailability() {
    setError("");
    if (!date) { setError("Please pick a date first."); return; }
    setBusy(true);
    try {
      const list = await fetchRooms(date);
      setRooms(list);
      setSelectedRoomId("");
      setStep(2);
    } catch (e) {
      setError(e.message || "Failed to load rooms");
    } finally {
      setBusy(false);
    }
  }

  async function handleCreateHold() {
    setError("");
    if (!selectedRoom) { setError("Select a room first."); return; }
    if (!guest.name || !isValidEmail(guest.email) || !isValidPhone(guest.phone)) {
      setError("Enter valid name, email and phone.");
      return;
    }
    setBusy(true);
    try {
      const res = await createHold({ date, roomId: selectedRoom._id, guest });
      setHoldId(res.holdId);
      return res.holdId;
    } catch (e) {
      setError(e.message || "Could not create hold");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function handleConfirm() {
    setError("");
    if (!holdId) { setError("Please complete guest details first."); return; }
    if (!payment.method) { setError("Select a payment method."); return; }

    // minimal front-end checks
    if (payment.method === "upi" && !payment.upi) { setError("Enter your UPI ID."); return; }
    const isCard = payment.method === "card" || payment.method === "debit";
    if (isCard && (!payment.cardNo || !payment.expiry || !payment.cvv)) { setError("Enter complete card details."); return; }

    setBusy(true);
    try {
      const res = await confirmBooking({ holdId, payment: { method: payment.method, ref: "UI" } });
      setConfirmRes(res);
      // Hideously simple local “block”: mark selected room sold out for this session
      setRooms((prev) => prev.map((r) => (r._id === selectedRoomId ? { ...r, soldOut: true } : r)));
      setStep(3); // Move to Review within CheckoutStep (we treat step=3 as Checkout; the inner section shows review)
    } catch (e) {
      setError(e.message || "Payment/confirmation failed");
    } finally {
      setBusy(false);
    }
  }

  return (
   <div className="container py-5">
  <div className="row">
    {/* LEFT SIDE – Stay Booking */}
    <div className="col-lg-6 mb-4">
      <h2 className="fw-bold mb-4 text-center">Book Your Farm Stay</h2>

      {/* 3-step pill stepper */}
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        {["Date", "Rooms", "Checkout"].map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div
              key={label}
              className={`d-flex align-items-center px-3 py-2 rounded-pill ${
                active
                  ? "bg-primary text-white"
                  : done
                  ? "bg-success text-white"
                  : "bg-light"
              }`}
            >
              <span className="fw-bold me-2">{n}</span> {label}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {step === 1 && (
        <CalendarStep
          date={date}
          setDate={setDate}
          busy={busy}
          onCheckAvailability={handleCheckAvailability}
        />
      )}

      {step === 2 && (
        <RoomsStep
          date={date}
          rooms={rooms}
          selectedRoomId={selectedRoomId}
          onSelectRoom={setSelectedRoomId}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <CheckoutStep
          date={date}
          room={selectedRoom}
          guest={guest}
          setGuest={setGuest}
          holdId={holdId}
          onCreateHold={handleCreateHold}
          payment={payment}
          setPayment={setPayment}
          onConfirm={handleConfirm}
          confirmRes={confirmRes}
          busy={busy}
          onBack={() => setStep(2)}
          onReset={resetAll}
        />
      )}
    </div>

    {/* RIGHT SIDE – Activity Booking (without stay) */}
    <div className="col-lg-6 mb-4">
      <h2 className="fw-bold mb-4 text-center">Book Activities Only</h2>
      <ActivityBooking />
    </div>
  </div>
</div>

  );
}
