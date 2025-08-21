import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookNow from "./BookNow";
import RoomsStep from "./RoomInfo";
import CheckoutStep from "./Checkout";
import ActivityBooking from "./ActivityBooking";
import CalendarStep from "./Availability";

const BookingPage = () => {
  const [showModal, setShowModal] = useState(false); // modal for mobile/OTP
  const [stage, setStage] = useState("enterMobile"); // modal stage: enterMobile / enterOTP
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [step, setStep] = useState(1);
  const [date, setDate] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [guest, setGuest] = useState({});
  const [holdId, setHoldId] = useState(null);
  const [payment, setPayment] = useState({});
  const [error, setError] = useState("");
  const busy = false;
  const confirmRes = {};

  const [otpVerified, setOtpVerified] = useState(false); // Only show booking after verification

  const sendOtp = () => {
    if (!/^\d{10}$/.test(mobile)) {
      alert("Enter a valid 10-digit mobile number!");
      return;
    }
    const otpGenerated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpGenerated);
    alert(`OTP sent: ${otpGenerated} (simulated)`); 
    setStage("enterOTP");
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setShowModal(false); // close modal
      setOtpVerified(true); // booking details will now show
    } else {
      alert("Invalid OTP, try again!");
    }
  };

  const handleCheckAvailability = () => console.log("Check availability for:", date);
  const handleCreateHold = () => console.log("Hold created for room:", selectedRoomId);
  const handleConfirm = () => console.log("Booking confirmed!");
  const resetAll = () => {
    setStep(1);
    setDate(null);
    setSelectedRoomId(null);
    setGuest({});
    setPayment({});
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Background BookNow image always visible */}
      {!otpVerified && (
        <BookNow onClick={() => setShowModal(true)} />
      )}

      {/* Mobile + OTP Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              {stage === "enterMobile" ? (
                <>
                  <h5 className="text-center mb-3">Enter Mobile Number</h5>
                  <input
                    type="tel"
                    className="form-control mb-3"
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    maxLength={10}
                  />
                  <div className="text-center">
                    <button className="btn btn-primary me-2" onClick={sendOtp}>
                      Send OTP
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="text-center mb-3">Enter OTP</h5>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  <div className="text-center">
                    <button className="btn btn-success me-2" onClick={verifyOtp}>
                      Verify OTP
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Details - show only after OTP verified */}
      {otpVerified && (
        <div className="container py-5">
          <div className="row">
            <h2 className="fw-bold mb-4 text-center">Book your slot</h2>
            <div className="col-lg-6 mb-4">
              <h3 className="fw-bold mb-4 text-center">With Stay</h3>

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

              {error && <div className="alert alert-danger">{error}</div>}

              {step === 1 && <CalendarStep date={date} setDate={setDate} busy={busy} onCheckAvailability={handleCheckAvailability} />}
              {step === 2 && <RoomsStep date={date} rooms={rooms} selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
              {step === 3 && <CheckoutStep date={date} room={selectedRoomId} guest={guest} setGuest={setGuest} holdId={holdId} onCreateHold={handleCreateHold} payment={payment} setPayment={setPayment} onConfirm={handleConfirm} confirmRes={confirmRes} busy={busy} onBack={() => setStep(2)} onReset={resetAll} />}
            </div>

            <div className="col-lg-6 mb-4">
              <h3 className="fw-bold mb-4 text-center">Without Stay</h3>
              <ActivityBooking />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
