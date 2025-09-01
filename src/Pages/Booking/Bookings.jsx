import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ActivityDetails from './ActivityDetails';
import StayDetails from './StayingDetails';


const BookingPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const location = useLocation();


  const today = new Date().toISOString().split('T')[0];
  const nowTime = new Date().toTimeString().slice(0, 5);



  // Pricing configuration
  const pricing = {
    adventure: {
      farm: 1500,
      bday: 2500,
      swimming: 2000,
      avroom: 3000
    },
    stay: {
      basePrice: 7000,
      personLimit: 3,
      additionalPersonCharge: 1500
    }
  };

  useEffect(() => {
    const typeFromStorage = localStorage.getItem('selectedBookingType');

    let typeFromPath = '';
    if (location.pathname.includes('/activities/book')) typeFromPath = 'adventure';
    if (location.pathname.includes('/staying/book')) typeFromPath = 'stay';

    setSelectedType(typeFromPath || '');
    // Do NOT remove localStorage here if you want to persist type for later
  }, [location.pathname]);


  // Calculate total for stay booking
  const calculateStayTotal = (details) => {
    const basePrice = pricing.stay.basePrice;
    const totalPersons = parseInt(details.adults) + parseInt(details.children);
    const roomsNeeded = Math.ceil(totalPersons / pricing.stay.personLimit);
    const additionalPersonCost = Math.max(0, totalPersons - (pricing.stay.personLimit * roomsNeeded)) * pricing.stay.additionalPersonCharge;

    return {
      basePrice: basePrice * roomsNeeded,
      additionalPersonCost,
      total: (basePrice * roomsNeeded) + additionalPersonCost,
      roomsNeeded,
      totalPersons
    };
  };

  const handleBookingSubmit = (details, type) => {
    setBookingDetails({ ...details, type });
    setShowPayment(true);
  };

  const handlePaymentSubmit = (paymentData) => {
    setBookingConfirmed(true);
    setShowPayment(false);
  };

  const getActivityName = (activityCode) => {
    const activities = {
      farm: "One Day Farm Visit",
      bday: "Birthday Party (4 hrs)",
      swimming: "Swimming Pool with Food (2 hrs)",
      avroom: "AV Room with Food (4 hrs)"
    };
    return activities[activityCode] || activityCode;
  };

  // Payment Methods Component
  const PaymentMethods = () => {
    const [paymentData, setPaymentData] = useState({
      upiId: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: '',
      email: '',
      phone: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handlePaymentSubmit(paymentData);
    };

    const renderPaymentForm = () => {
      switch (selectedPaymentMethod) {
        case 'upi':
          return (
            <div className="mb-4">
              <label className="form-label">UPI ID *</label>
              <input
                type="text"
                className="form-control"
                placeholder="yourname@upi"
                value={paymentData.upiId}
                onChange={(e) => setPaymentData({ ...paymentData, upiId: e.target.value })}
                required
              />
              <div className="form-text">Enter your UPI ID (e.g., name@ybl, name@okicici)</div>
            </div>
          );

        case 'creditcard':
        case 'debitcard':
          return (
            <>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label className="form-label">Card Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">CVV *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Expiry Date *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Card Holder Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="John Doe"
                    value={paymentData.cardHolder}
                    onChange={(e) => setPaymentData({ ...paymentData, cardHolder: e.target.value })}
                    required
                  />
                </div>
              </div>
            </>
          );

        default:
          return null;
      }
    };

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-header bg-warning text-dark">
                <h3 className="mb-0">Payment Details</h3>
              </div>
              <div className="card-body">
                <div className="alert alert-success mb-4">
                  <h5>Booking Summary (Confirmed)</h5>
                  <p><strong>Total Amount: ₹{bookingDetails.total}</strong></p>
                  {bookingDetails.type === 'stay' && (
                    <>
                      <p>Room Type: {bookingDetails.roomType}</p>
                      <p>Rooms: {bookingDetails.roomsNeeded}</p>
                      <p>Adults: {bookingDetails.adults}</p>
                      <p>Children: {bookingDetails.children}</p>
                      <p>Check-in: {bookingDetails.checkInDate}</p>
                      <p>Check-out: {bookingDetails.checkOutDate}</p>
                    </>
                  )}
                  {bookingDetails.type === 'adventure' && (
                    <>
                      <p>Activity: {getActivityName(bookingDetails.activity)}</p>
                      <p>Guests: {bookingDetails.numGuests}</p>
                      <p>Date: {bookingDetails.date}</p>
                      <p>Time: {bookingDetails.time}</p>
                    </>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Select Payment Method *</label>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div
                        className={`card payment-method-card ${selectedPaymentMethod === 'upi' ? 'border-primary' : ''}`}
                        onClick={() => setSelectedPaymentMethod('upi')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body text-center">
                          <i className="fas fa-mobile-alt fa-2x mb-2"></i>
                          <h6>UPI</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div
                        className={`card payment-method-card ${selectedPaymentMethod === 'creditcard' ? 'border-primary' : ''}`}
                        onClick={() => setSelectedPaymentMethod('creditcard')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body text-center">
                          <i className="fas fa-credit-card fa-2x mb-2"></i>
                          <h6>Credit Card</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div
                        className={`card payment-method-card ${selectedPaymentMethod === 'debitcard' ? 'border-primary' : ''}`}
                        onClick={() => setSelectedPaymentMethod('debitcard')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body text-center">
                          <i className="fas fa-credit-card fa-2x mb-2"></i>
                          <h6>Debit Card</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedPaymentMethod && (
                  <form onSubmit={handleSubmit}>
                    {renderPaymentForm()}

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="john@example.com"
                          value={paymentData.email}
                          onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number *</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="+91 1234567890"
                          value={paymentData.phone}
                          onChange={(e) => setPaymentData({ ...paymentData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg"
                        disabled={!selectedPaymentMethod}
                      >
                        Confirm Payment of ₹{bookingDetails.total}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPayment(false)}
                      >
                        Back to Booking
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Confirmation Component
  const ConfirmationPage = () => {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow border-success">
              <div className="card-header bg-success text-white">
                <h3 className="mb-0">🎉 Booking Confirmed!</h3>
              </div>
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="fas fa-check-circle fa-5x text-success mb-3"></i>
                  <h4>Thank you for your booking!</h4>
                  <p className="text-muted">Your payment has been processed successfully.</p>
                </div>

                <div className="alert alert-info text-start">
                  <h5>Booking Details</h5>
                  <p><strong>Booking Reference:</strong> #BK{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  <p><strong>Total Paid:</strong> ₹{bookingDetails.total}</p>
                  <p><strong>Payment Method:</strong> {selectedPaymentMethod.toUpperCase()}</p>

                  {bookingDetails.type === 'stay' && (
                    <>
                      <p><strong>Room Type:</strong> {bookingDetails.roomType}</p>
                      <p><strong>Rooms:</strong> {bookingDetails.roomsNeeded}</p>
                      <p><strong>Guests:</strong> {bookingDetails.totalPersons} ({bookingDetails.adults} adults, {bookingDetails.children} children)</p>
                      <p><strong>Check-in:</strong> {bookingDetails.checkInDate}</p>
                      <p><strong>Check-out:</strong> {bookingDetails.checkOutDate}</p>
                    </>
                  )}

                  {bookingDetails.type === 'adventure' && (
                    <>
                      <p><strong>Activity:</strong> {getActivityName(bookingDetails.activity)}</p>
                      <p><strong>Guests:</strong> {bookingDetails.numGuests}</p>
                      <p><strong>Date:</strong> {bookingDetails.date}</p>
                      <p><strong>Time:</strong> {bookingDetails.time}</p>
                    </>
                  )}
                </div>

                <div className="alert alert-warning">
                  <h6>📋 Important Information</h6>
                  <ul className="mb-0">
                    <li>Booking details cannot be modified after confirmation</li>
                    <li>Please bring valid ID proof during check-in</li>
                    <li>Cancellation policy: 48 hours notice required for full refund</li>
                    <li>Confirmation email has been sent to your registered email</li>
                  </ul>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Make Another Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
const AdventureForm = () => {
  const [formData, setFormData] = useState({
    activity: '',
    numGuests: 1,
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = pricing.adventure[formData.activity] * formData.numGuests;
    handleBookingSubmit({ ...formData, total }, 'adventure');
  };

  const getActivityPrice = () => {
    return formData.activity ? pricing.adventure[formData.activity] : 0;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Adventure Booking</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Activity *</label>
                    <select
                      className="form-select"
                      value={formData.activity}
                      onChange={(e) =>
                        setFormData({ ...formData, activity: e.target.value })
                      }
                      required
                    >
                      <option value="">-- Select Activity --</option>
                      <option value="farm">One Day Farm Visit (₹1500)</option>
                      <option value="bday">Birthday Party (₹2500)</option>
                      <option value="swimming">Swimming Pool with Food (₹2000)</option>
                      <option value="avroom">AV Room with Food (₹3000)</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Number of Guests *</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      max="20"
                      value={formData.numGuests}
                      onChange={(e) =>
                        setFormData({ ...formData, numGuests: parseInt(e.target.value) })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.date}
                      min={today}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Time *</label>
                    <input
                      type="time"
                      className="form-control"
                      value={formData.time}
                      min={formData.date === today ? nowTime : '00:00'}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {formData.activity && (
                  <div className="alert alert-info">
                    <strong>Price Breakdown:</strong><br />
                    {formData.numGuests} guest(s) × ₹{getActivityPrice()} = ₹{getActivityPrice() * formData.numGuests}
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100">
                  Proceed to Payment
                </button>
              </form>  
            </div>
          </div>
                {formData.activity && <ActivityDetails activity={formData.activity} />}
        </div>
      </div>
    </div>
  );
};

  // Stay Form Component
  const StayForm = () => {
    const [formData, setFormData] = useState({
      roomType: '',
      checkInDate: '',
      checkOutDate: '',
      adults: 1,
      children: 0
    });
      const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  // Disable check-in for current date after 12 PM
  const isToday = formData.checkInDate === today;
  const checkinDisabled = isToday && (currentHour >= 12);

    const handleSubmit = (e) => {
  e.preventDefault();
  if(checkinDisabled) return; // prevent booking
  const calculation = calculateStayTotal(formData);
  handleBookingSubmit({ ...formData, ...calculation }, 'stay');
};

    const calculation = calculateStayTotal(formData);
    const totalPersons = parseInt(formData.adults) + parseInt(formData.children);

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-header bg-success text-white">
                <h3 className="mb-0">Staying In</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Room Type *</label>
                      <select
                        className="form-select"
                        value={formData.roomType}
                        onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                        required
                      >
                        <option value="">-- Select Room Type --</option>
                        <option value="deluxe">Deluxe Room</option>
                        <option value="suite">Suite</option>
                        <option value="family">Family Room</option>
                        <option value="villa">Private Villa</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Total Persons: {totalPersons}</label>
                      <div className="row">
                        <div className="col-6">
                          <label className="form-label">Adults *</label>
                          <input
                            type="number"
                            className="form-control"
                            min="1"
                            max="10"
                            value={formData.adults}
                            onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                            required
                          />
                        </div>
                        <div className="col-6">
                          <label className="form-label">Children</label>
                          <input
                            type="number"
                            className="form-control"
                            min="0"
                            max="10"
                            value={formData.children}
                            onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Check-in Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.checkInDate}
                        min={today}
                        onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                        required
                      />
                      {checkinDisabled && (
                        <div className="alert alert-warning mt-2">
                          Check-in for today is not allowed after 12:00 PM. Please select a future date.
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Check-out Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.checkOutDate}
                        min={formData.checkInDate || today}
                        onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {totalPersons > 0 && (
                    <div className="alert alert-info">
                      <strong>Price Calculation:</strong><br />
                      - Rooms Required: {calculation.roomsNeeded} × ₹{pricing.stay.basePrice} = ₹{calculation.basePrice}<br />
                      {calculation.additionalPersonCost > 0 && (
                        <>- Additional Person Charge: ₹{calculation.additionalPersonCost}<br /></>
                      )}
                      - <strong>Grand Total: ₹{calculation.total}</strong>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={totalPersons === 0}
                  >
                    Proceed to Payment
                  </button>
                </form>
              </div>
            </div>
             <StayDetails />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {bookingConfirmed ? (
        <ConfirmationPage />
      ) : showPayment ? (
        <PaymentMethods />
      ) : (
        <>
          {selectedType === 'adventure' && <AdventureForm />}
          {selectedType === 'stay' && <StayForm />}
          {!selectedType && (
            <div className="container mt-5 text-center">
              <div className="alert alert-info">
                <h4>Please select a booking option from the navigation menu</h4>
                <p>Go back and choose either "Adventures" or "Adventures with Stay"</p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BookingPage;
