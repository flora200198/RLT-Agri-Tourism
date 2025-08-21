// BookNow.jsx
import React from "react";

const BookNow = ({ onClick }) => {
  return (
    <div className="position-relative text-center" style={{ height: "80vh" }}>
      <img
        src="/assets/Farming.png"
        alt="Farm Visit"
        className="img-fluid w-100 h-100"
        style={{ objectFit: "cover" }}
      />
      <button
        className="btn btn-primary position-absolute top-50 start-50 translate-middle"
        style={{ padding: "16px 32px", fontSize: "1.5rem" }}
        onClick={onClick} // <-- Make sure this is here
      >
        Book Now
      </button>
    </div>
  );
};

export default BookNow;
