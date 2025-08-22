import React, { useState } from 'react';

const StayForm = () => {
    const [roomType, setRoomType] = useState('');
    const [numRooms, setNumRooms] = useState(1);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const handleRoomTypeChange = (e) => {
        setRoomType(e.target.value);
    };

    const handleNumRoomsChange = (e) => {
        setNumRooms(e.target.value);
    };

    const handleCheckInChange = (e) => {
        setCheckInDate(e.target.value);
    };

    const handleCheckOutChange = (e) => {
        setCheckOutDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Room booked!');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h3>Room Booking</h3>
            <div className="form-group">
                <label htmlFor="roomType">Room Type</label>
                <select id="roomType" className="form-control" value={roomType} onChange={handleRoomTypeChange}>
                    <option value="">-- Select Room Type --</option>
                    <option value="deluxe">Deluxe Room</option>
                    <option value="suite">Suite</option>
                    <option value="family">Family Room</option>
                    <option value="villa">Private Villa</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="numRooms">Number of Rooms</label>
                <input type="number" id="numRooms" className="form-control" min="1" max="5" value={numRooms} onChange={handleNumRoomsChange} />
            </div>
            <div className="form-group">
                <label htmlFor="checkIn">Check-in Date</label>
                <input type="date" id="checkIn" className="form-control" value={checkInDate} onChange={handleCheckInChange} />
            </div>
            <div className="form-group">
                <label htmlFor="checkOut">Check-out Date</label>
                <input type="date" id="checkOut" className="form-control" value={checkOutDate} onChange={handleCheckOutChange} />
            </div>
            <button type="submit" className="btn btn-success">Book Room</button>
        </form>
    );
};

export default StayForm;
