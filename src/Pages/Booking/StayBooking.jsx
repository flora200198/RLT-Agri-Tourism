import React, { useState } from "react";
import RoomSelection from './RoomInfo'
import CheckoutStep from "./Checkout";
import CalendarStep from "./Availability";

const StayBooking = ({ error }) => {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [guest, setGuest] = useState({});
    const [holdId, setHoldId] = useState(null);
    const [payment, setPayment] = useState({});
    const [confirmRes, setConfirmRes] = useState(null);
    const [busy, setBusy] = useState(false);

    // handlers (simplified, you already have them in your file)
    const handleCheckAvailability = () => {
        // API call here
        setBusy(true);
        setTimeout(() => {
            setRooms([{ id: 1, name: "Deluxe Room" }, { id: 2, name: "Suite" }]);
            setBusy(false);
            setStep(2);
        }, 1000);
    };

    const handleSelectRoom = (roomId) => {
        // Toggle selection: deselect if same room clicked again
        setSelectedRoomId((prev) => (prev === roomId ? null : roomId));
    };

    const handleCreateHold = () => {
        setHoldId("HOLD123");
    };
    const goToCheckout = () => {
  setStep(3); // move from RoomSelection to CheckoutStep
};

    const handleConfirm = () => {
        setConfirmRes("Booking Confirmed ✅");
    };

    const resetAll = () => {
        setStep(1);
        setDate(null);
        setRooms([]);
        setSelectedRoomId(null);
        setGuest({});
        setHoldId(null);
        setPayment({});
        setConfirmRes(null);
    };

    return (
        <div>
            <h3 className="fw-bold mb-4 text-center">Staying In</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            {step === 1 && (
                <CalendarStep
                    date={date}
                    setDate={setDate}
                    busy={busy}
                    onCheckAvailability={handleCheckAvailability}
                />
            )}

            {step === 2 && (
                <RoomSelection
                    date={date}
                    rooms={rooms || []}
                    selectedRoomId={selectedRoomId}
                    onSelectRoom={handleSelectRoom}
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)}
                />
            )}

            {/* {step === 3 && (
                <CheckoutStep
                    date={date}
                    room={selectedRoomId}
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
            )} */}
        </div>
    );
};

export default StayBooking;
