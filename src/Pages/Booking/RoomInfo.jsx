import React, { useState } from "react";

const RoomSelection = () => {
  const rooms = [
    { name: "Deluxe Room", sleeps: 3, price: 7000, Stay: '/assets/FarmHouse.png' },
    // { name: "Suite", sleeps: 3, price: 7000, Stay: '/assets/FarmHouse1.png' },
  ];

  const [selectedRooms, setSelectedRooms] = useState([]);

  // Select/deselect room
  const handleSelect = (roomName) => {
    if (selectedRooms.some((r) => r.name === roomName)) {
      setSelectedRooms(selectedRooms.filter((r) => r.name !== roomName));
    } else {
      setSelectedRooms([
        ...selectedRooms,
        { name: roomName, adults: 1, kids: 0, infants: 0, rooms: 1 },
      ]);
    }
  };

  // Update guest count
  const updateGuestCount = (roomName, type, value) => {
    setSelectedRooms(
      selectedRooms.map((r) => {
        if (r.name === roomName) {
          const newValue = r[type] + value;

          if (type === "infants") {
            return { ...r, infants: Math.max(0, newValue) };
          }

          let newAdults = type === "adults" ? newValue : r.adults;
          let newKids = type === "kids" ? newValue : r.kids;

          if (newAdults < 1) return r;

          let totalGuests = newAdults + newKids;
          let newRooms = Math.ceil(totalGuests / 3);

          return {
            ...r,
            adults: newAdults,
            kids: newKids,
            rooms: newRooms,
          };
        }
        return r;
      })
    );
  };

  // Update room count manually
  const updateRoomCount = (roomName, value) => {
    setSelectedRooms(
      selectedRooms.map((r) => {
        if (r.name === roomName) {
          const newRoomCount = Math.max(1, r.rooms + value);
          return { ...r, rooms: newRoomCount };
        }
        return r;
      })
    );
  };

  return (
    <div className="container mt-4">
      <h4>
        Available Rooms on <span className="text-primary">2025-08-22</span>
      </h4>

      {rooms.map((room, index) => {
        const selected = selectedRooms.find((r) => r.name === room.name);
        const totalPrice = selected ? room.price * selected.rooms : 0;

        return (
          <div key={index} className="card p-3 mb-3 shadow-sm">
            {/* First Row: Room Info + Amenities */}
            <div className="d-flex justify-content-between align-items-start">
              {/* Left: Image + Room Details */}
              <div style={{ maxWidth: "50%" }}>
                <img
                  src={room.Stay}
                  style={{ width: "100%", height: "auto" }}
                  alt={room.name}
                />
                <h5 className="mt-2">{room.name}</h5>
                <p>
                  Sleeps {room.sleeps} (max 3 adults/kids per room) · ₹
                  {room.price.toLocaleString()} / night
                </p>
              </div>

              {/* Right: Amenities + Select button */}
              <div
                style={{ maxWidth: "45%" }}
                className="d-flex flex-column justify-content-between"
              >
                <div>
                  <strong>Amenities</strong>
                  <p>- Free WiFi, AC, TV</p>
                  <strong>House Rules</strong>
                  <p>- No smoking, Pets not allowed</p>
                </div>

                {!selected && (
                  <button
                    className="btn btn-outline-primary mt-3"
                    onClick={() => handleSelect(room.name)}
                  >
                    Select
                  </button>
                )}
              </div>
            </div>

            {/* Second Row: Guest + Room Counters (only after selection) */}
            {selected && (
              <div className="mt-1">
                <div className="d-flex flex-column align-items-end gap-1">
                  {/* Rooms */}
                  <div className="d-flex align-items-center gap-2">
                    <label className="mb-0">Rooms:</label>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateRoomCount(room.name, -1)}
                      disabled={selected.rooms <= 1}
                    >
                      -
                    </button>
                    <span>{selected.rooms}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateRoomCount(room.name, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Adults */}
                  <div className="d-flex align-items-center gap-2">
                    <label className="mb-0">Adults:</label>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateGuestCount(room.name, "adults", -1)}
                      disabled={selected.adults <= 1}
                    >
                      -
                    </button>
                    <span>{selected.adults}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateGuestCount(room.name, "adults", 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Kids */}
                  <div className="d-flex align-items-center gap-2">
                    <label className="mb-0">Kids:</label>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateGuestCount(room.name, "kids", -1)}
                      disabled={selected.kids <= 0}
                    >
                      -
                    </button>
                    <span>{selected.kids}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateGuestCount(room.name, "kids", 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Infants */}
                  <div className="d-flex align-items-center gap-2">
                    <label className="mb-0">Infants:</label>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateGuestCount(room.name, "infants", -1)}
                      disabled={selected.infants <= 0}
                    >
                      -
                    </button>
                    <span>{selected.infants}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => updateGuestCount(room.name, "infants", 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="mt-2">
                    <strong>Total Price:</strong> ₹{totalPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button className="btn btn-primary" disabled={selectedRooms.length === 0} >
        Continue
      </button>
    </div>
  );
};

export default RoomSelection;
