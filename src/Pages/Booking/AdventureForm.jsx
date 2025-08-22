import React, { useState } from 'react';

const AdventureForm = () => {
    const [activity, setActivity] = useState('');
    const [numGuests, setNumGuests] = useState(1);

    const handleActivityChange = (e) => {
        setActivity(e.target.value);
    };

    const handleNumGuestsChange = (e) => {
        setNumGuests(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Adventure booked!');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h3>Adventure Booking</h3>
            <div className="form-group">
                <label htmlFor="activity">Select Activity</label>
                <select id="activity" className="form-control" value={activity} onChange={handleActivityChange}>
                    <option value="">-- Select --</option>
                    <option value="farm">One Day Farm Visit</option>
                    <option value="bday">Birthday Party (4 hrs)</option>
                    <option value="swimming">Swimming Pool with Food (2 hrs)</option>
                    <option value="avroom">AV Room with Food (4 hrs)</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="numGuests">Number of Guests</label>
                <input type="number" id="numGuests" className="form-control" min="1" max="20" value={numGuests} onChange={handleNumGuestsChange} />
            </div>
            <button type="submit" className="btn btn-primary">Book Adventure</button>
        </form>
    );
};

export default AdventureForm;
