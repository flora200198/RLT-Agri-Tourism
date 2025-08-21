
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookNow from "./BookNow";
import ActivityBooking from "./ActivityBooking";
import './Booking.css';
import StayBooking from './StayBooking'

const BookingPage = () => {
  const [showModal, setShowModal] = useState(false); // modal for mobile/OTP
  const [stage, setStage] = useState("enterMobile"); // modal stage: enterMobile / enterOTP
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
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

  return (
    <div style={{ position: "relative" }}>
      {/* Background BookNow image always visible */}
      {!otpVerified && <BookNow onClick={() => setShowModal(true)} />}

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
          <h2 className="fw-bold mb-4 text-center">Book your slot</h2>

          {/* Without Stay (Activity Booking) */}
          <div className="mb-5">
           
            <ActivityBooking />
          </div>
          <StayBooking/>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
