// import React, { useState } from "react";
// import './ActivityBooking.css';
// import Calendar from "react-calendar";
// import { format } from "date-fns";
// import "react-calendar/dist/Calendar.css";

// export default function ActivityBooking() {
//     const [step, setStep] = useState(1);
//     const [activity, setActivity] = useState("");
//     const [date, setDate] = useState("");
//     const [slot, setSlot] = useState("");
//     const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
//     const [paymentMethod, setPaymentMethod] = useState(""); // ✅ fixed
//     const [confirmed, setConfirmed] = useState(false);
//     const [upiId, setUpiId] = useState("");
//     const [cardNumber, setCardNumber] = useState("");
//     const [expiry, setExpiry] = useState("");
//     const [cvv, setCvv] = useState("");
//     const [availability, setAvailability] = useState({});
//     const [bookingType, setBookingType] = useState({});


//     // Slots based on activity
//     const getSlots = () => {
//         if (activity === "swimming") {
//             return ["10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"];
//         }
//         if (activity === "farm" || activity === "bday" || activity === "avroom") {
//             return ["10:00 - 14:00", "14:30 - 18:30"];
//         }
//         return [];
//     };
//     // Form submit handler
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!activity || !date || !slot || !guest.name || !guest.email || !guest.phone || !paymentMethod) {
//             alert("Please fill all details before confirming booking.");
//             return;
//         }
//         setConfirmed(true);
//     };

//     return (
//         <section className="container py-5">
//             {/* <h2 className="fw-bold text-center mb-4">Book Activities (Without Stay)</h2> */}
//             {!confirmed ? (
//                 <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
//                     {/* STEP 1: Select Activity */}
//                     {step === 1 && (
//                         <div>
//                             <label className="form-label">Choose Activity</label>
//                             <select
//                                 className="form-select mb-3"
//                                 value={activity}
//                                 onChange={(e) => setActivity(e.target.value)}
//                                 required
//                             >
//                                 <option value="">-- Select --</option>
//                                 <option value="farm">One Day Farm Visit</option>
//                                 <option value="bday">Birthday Party (4 hrs)</option>
//                                 <option value="swimming">Swimming Pool with Food (2 hrs)</option>
//                                 <option value="avroom">AV Room with Food (4 hrs)</option>
//                             </select>
//                             <button
//                                 type="button"
//                                 className="btn btn-primary w-100"
//                                 disabled={!activity}
//                                 onClick={() => setStep(2)}
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     )}

//                     {step === 2 && (
//                         <div>
//                             <h5 className="mb-3">Pick a Date</h5>

//                             {/* Calendar Component */}
//                             <Calendar
//                                 onChange={(d) => {
//                                     const picked = format(d, "yyyy-MM-dd");
//                                     setDate(picked);

//                                     // Generate slots dynamically for the picked date
//                                     const slots = {};

//                                     // Define slots for each activity
//                                     const activitySlots = {
//                                         farm: ["10:00 AM - 2:00 PM", "2:30 PM - 6:30 PM"],
//                                         bday: ["10:00 AM - 2:00 PM", "3:00 PM - 7:00 PM"],
//                                         swimming: ["10:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"],
//                                         avroom: ["9:00 AM - 1:00 PM", "2:00 PM - 6:00 PM"],
//                                     };

//                                     slots[picked] = activitySlots;

//                                     setAvailability((prev) => ({
//                                         ...prev,
//                                         ...slots,
//                                     }));
//                                 }}
//                                 value={date ? new Date(date) : null}
//                                 tileClassName={({ date }) => {
//                                     const dayStr = format(date, "yyyy-MM-dd");
//                                     if (
//                                         availability[dayStr] &&
//                                         availability[dayStr][activity] &&
//                                         availability[dayStr][activity].length === 0
//                                     ) {
//                                         return "booked-date"; // fully booked for that activity
//                                     }
//                                     return "available-date";
//                                 }}
//                             />

//                             {/* Show slots for the chosen activity only */}
//                             {date && availability[date] && (
//                                 <div className="mt-3">
//                                     <h6>
//                                         Available Slots for {date} –{" "}
//                                         {activity === "farm" && "One Day Farm Visit"}
//                                         {activity === "bday" && "Birthday Party"}
//                                         {activity === "swimming" && "Swimming Pool"}
//                                         {activity === "avroom" && "AV Room"}
//                                     </h6>

//                                     {availability[date][activity] && availability[date][activity].length > 0 ? (
//                                         <div className="d-flex flex-wrap gap-2">
//                                             {availability[date][activity].map((s) => (
//                                                 <button
//                                                     key={s}
//                                                     type="button"
//                                                     className={`btn ${slot === s ? "btn-success" : "btn-outline-primary"}`}
//                                                     onClick={() => setSlot(s)}
//                                                 >
//                                                     {s}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     ) : (
//                                         <p className="text-danger">No slots available ❌</p>
//                                     )}
//                                 </div>
//                             )}

//                             {/* Navigation Buttons */}
//                             <div className="d-flex justify-content-between mt-4">
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setStep(1)}
//                                 >
//                                     Back
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-primary"
//                                     disabled={!date || !slot}
//                                     onClick={() => setStep(3)}
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                     {/* STEP 3: Guest Details */}
//                     {step === 3 && (
//                         <div>
//                             <label className="form-label">Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control mb-3"
//                                 value={guest.name}
//                                 onChange={(e) => setGuest({ ...guest, name: e.target.value })}
//                                 required
//                             />
//                             <label className="form-label">Email</label>
//                             <input
//                                 type="email"
//                                 className="form-control mb-3"
//                                 value={guest.email}
//                                 onChange={(e) => setGuest({ ...guest, email: e.target.value })}
//                                 required
//                             />
//                             <label className="form-label">Phone</label>
//                             <input
//                                 type="tel"
//                                 className="form-control mb-3"
//                                 value={guest.phone}
//                                 onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
//                                 required
//                             />
//                             <div className="d-flex justify-content-between">
//                                 <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
//                                     Back
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-primary"
//                                     disabled={!guest.name || !guest.email || !guest.phone}
//                                     onClick={() => setStep(4)}
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* STEP 4: Payment */}
//                     {step === 4 && (
//                         <div>
//                             <h5 className="mb-3">Choose Payment Method</h5>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="payment"
//                                     id="upi"
//                                     value="upi"
//                                     checked={paymentMethod === "upi"}
//                                     onChange={(e) => setPaymentMethod(e.target.value)}
//                                 />
//                                 <label className="form-check-label" htmlFor="upi">
//                                     UPI
//                                 </label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="payment"
//                                     id="card"
//                                     value="card"
//                                     checked={paymentMethod === "card"}
//                                     onChange={(e) => setPaymentMethod(e.target.value)}
//                                 />
//                                 <label className="form-check-label" htmlFor="card">
//                                     Credit / Debit Card
//                                 </label>
//                             </div>
//                             <div className="form-check mb-3">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="payment"
//                                     id="cash"
//                                     value="cash"
//                                     checked={paymentMethod === "cash"}
//                                     onChange={(e) => setPaymentMethod(e.target.value)}
//                                 />
//                                 <label className="form-check-label" htmlFor="cash">
//                                     Cash on Arrival
//                                 </label>
//                             </div>

//                             <div className="d-flex justify-content-between">
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setStep(3)}
//                                 >
//                                     Back
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-success"
//                                     onClick={() => {
//                                         if (!paymentMethod) {
//                                             alert("Please choose a payment method.");
//                                             return;
//                                         }
//                                         if (paymentMethod === "cash") {
//                                             setConfirmed(true); // directly confirm for cash
//                                         } else {
//                                             setStep(5); // go to payment details screen
//                                         }
//                                     }}
//                                 >
//                                     Continue
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* Step 5: Payment Details */}
//                     {step === 5 && paymentMethod === "upi" && (
//                         <div>
//                             <h5 className="mb-3">Enter UPI Details</h5>
//                             <input
//                                 type="text"
//                                 className="form-control mb-3"
//                                 placeholder="Enter UPI ID (e.g. yourname@upi)"
//                                 value={upiId}
//                                 onChange={(e) => setUpiId(e.target.value)}
//                                 required
//                             />
//                             <div className="d-flex justify-content-between">
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setStep(4)}
//                                 >
//                                     Back
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-primary"
//                                     onClick={() => {
//                                         if (!upiId) {
//                                             alert("Please enter a valid UPI ID.");
//                                             return;
//                                         }
//                                         // here you can integrate real UPI payment gateway call
//                                         alert("UPI Payment Successful ✅");
//                                         setConfirmed(true);
//                                     }}
//                                 >
//                                     Pay Now
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {step === 5 && paymentMethod === "card" && (
//                         <div>
//                             <h5 className="mb-3">Enter Card Details</h5>
//                             <input
//                                 type="text"
//                                 className="form-control mb-2"
//                                 placeholder="Card Number"
//                                 value={cardNumber}
//                                 onChange={(e) => setCardNumber(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 className="form-control mb-2"
//                                 placeholder="Expiry Date (MM/YY)"
//                                 value={expiry}
//                                 onChange={(e) => setExpiry(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 className="form-control mb-3"
//                                 placeholder="CVV"
//                                 value={cvv}
//                                 onChange={(e) => setCvv(e.target.value)}
//                                 required
//                             />
//                             <div className="d-flex justify-content-between">
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setStep(4)}
//                                 >
//                                     Back
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-primary"
//                                     onClick={() => {
//                                         if (!cardNumber || !expiry || !cvv) {
//                                             alert("Please fill card details.");
//                                             return;
//                                         }
//                                         // integrate payment gateway call here
//                                         alert("Card Payment Successful ✅");
//                                         setConfirmed(true);
//                                     }}
//                                 >
//                                     Pay Now
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </form>
//             ) : (
//                 <div className="alert alert-success text-center">
//                     🎉 Booking Confirmed for <strong>{activity}</strong> on <strong>{date}</strong> at{" "}
//                     <strong>{slot}</strong> <br />
//                     Guest: {guest.name} ({guest.phone}) <br />
//                     Payment: <strong>{paymentMethod}</strong>
//                 </div>
//             )}
//         </section>
//     );
// }



import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";

export default function ActivityBooking() {
  const [step, setStep] = useState(1);
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState("");
  const [availability, setAvailability] = useState({});
  const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const steps = ["Activity", "Date & Slot", "Guest Details", "Payment"];

  return (
    <div className="p-4 shadow rounded bg-light">
      {/* Stepper */}
      <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
        {steps.map((label, i) => {
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

      {/* Form Steps */}
      {!confirmed ? (
        <form onSubmit={(e) => e.preventDefault()}>
          {/* STEP 1: Select Activity */}
          {step === 1 && (
            <div>
              <label className="form-label">Choose Activity</label>
              <select
                className="form-select mb-3"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                <option value="farm">One Day Farm Visit</option>
                <option value="bday">Birthday Party (4 hrs)</option>
                <option value="swimming">Swimming Pool with Food (2 hrs)</option>
                <option value="avroom">AV Room with Food (4 hrs)</option>
              </select>
              <button
                type="button"
                className="btn btn-primary w-100"
                disabled={!activity}
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          )}

          {/* STEP 2: Pick Date & Slot */}
          {step === 2 && (
            <div>
              <h5 className="mb-3">Pick a Date</h5>

              <Calendar
  onChange={(d) => {
    const picked = format(d, "yyyy-MM-dd");
    setDate(picked);

    // Activity-wise slots
    const activitySlots = {
      farm: ["10:00 AM - 2:00 PM", "2:30 PM - 6:30 PM"],
      bday: ["10:00 AM - 2:00 PM", "3:00 PM - 7:00 PM"],
      swimming: [
        "10:00 AM - 12:00 PM",
        "12:00 PM - 2:00 PM",
        "2:00 PM - 4:00 PM",
        "4:00 PM - 6:00 PM",
      ],
      avroom: ["9:00 AM - 1:00 PM", "2:00 PM - 6:00 PM"],
    };

    setAvailability((prev) => ({
      ...prev,
      [picked]: activitySlots,
    }));
  }}
  value={date ? new Date(date) : null}
  minDate={new Date()}   // ✅ ensures only today & future dates are selectable
  tileClassName={({ date }) => {
    const dayStr = format(date, "yyyy-MM-dd");
    if (
      availability[dayStr] &&
      availability[dayStr][activity] &&
      availability[dayStr][activity].length === 0
    ) {
      return "booked-date";
    }
    return "available-date";
  }}
/>


              {/* Slots */}
              {date && availability[date] && (
                <div className="mt-3">
                  <h6>
                    Available Slots for {date} –{" "}
                    {activity === "farm" && "One Day Farm Visit"}
                    {activity === "bday" && "Birthday Party"}
                    {activity === "swimming" && "Swimming Pool"}
                    {activity === "avroom" && "AV Room"}
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {availability[date][activity]?.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`btn ${
                          slot === s ? "btn-success" : "btn-outline-primary"
                        }`}
                        onClick={() => setSlot(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!date || !slot}
                  onClick={() => setStep(3)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Details */}
          {step === 3 && (
            <div>
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control mb-3"
                value={guest.name}
                onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                required
              />
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control mb-3"
                value={guest.email}
                onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                required
              />
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control mb-3"
                value={guest.phone}
                onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                required
              />
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!guest.name || !guest.email || !guest.phone}
                  onClick={() => setStep(4)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Payment */}
          {step === 4 && (
  <div>
    <h5 className="mb-3">Choose Payment Method</h5>

    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="payment"
        id="upi"
        value="upi"
        checked={paymentMethod === "upi"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      <label className="form-check-label" htmlFor="upi">
        UPI
      </label>
    </div>

    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="payment"
        id="card"
        value="card"
        checked={paymentMethod === "card"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      <label className="form-check-label" htmlFor="card">
        Credit / Debit Card
      </label>
    </div>

    <div className="form-check mb-3">
      <input
        className="form-check-input"
        type="radio"
        name="payment"
        id="cash"
        value="cash"
        checked={paymentMethod === "cash"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      <label className="form-check-label" htmlFor="cash">
        Cash on Arrival
      </label>
    </div>

    <div className="d-flex justify-content-between">
      <button type="button" className="btn btn-secondary" onClick={() => setStep(3)}>
        Back
      </button>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => {
          if (!paymentMethod) {
            alert("Please choose a payment method.");
            return;
          }
          if (paymentMethod === "cash") {
            setConfirmed(true); // confirm immediately
            setStep(6); // jump to confirmation
          } else {
            setStep(5); // go to payment details
          }
        }}
      >
        Continue
      </button>
    </div>
  </div>
)}

{/* STEP 5: Enter Payment Details */}
{step === 5 && (
  <div>
    <h5 className="mb-3">Enter Payment Details</h5>

    {paymentMethod === "upi" && (
      <div className="mb-3">
        <label className="form-label">UPI ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="yourname@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
        />
      </div>
    )}

    {paymentMethod === "card" && (
      <>
        <div className="mb-3">
          <label className="form-label">Card Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="text"
              className="form-control"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">CVV</label>
            <input
              type="password"
              className="form-control"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
      </>
    )}

    <div className="d-flex justify-content-between">
      <button type="button" className="btn btn-secondary" onClick={() => setStep(4)}>
        Back
      </button>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => {
          if (paymentMethod === "upi" && !upiId) {
            alert("Please enter UPI ID");
            return;
          }
          if (paymentMethod === "card" && (!cardNumber || !expiry || !cvv)) {
            alert("Please fill all card details");
            return;
          }
          setConfirmed(true);
          setStep(6); // move to confirmation
        }}
      >
        Pay Now
      </button>
    </div>
  </div>
)}

        </form>
      ) : (
        <div className="alert alert-success text-center">
          🎉 Booking Confirmed for <strong>{activity}</strong> on{" "}
          <strong>{date}</strong> at <strong>{slot}</strong> <br />
          Guest: {guest.name} ({guest.phone}) <br />
          Payment: <strong>{paymentMethod}</strong>
        </div>
      )}
    </div>
  );
}


