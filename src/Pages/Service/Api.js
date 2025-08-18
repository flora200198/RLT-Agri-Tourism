// src/modules/booking/api.js
const USE_MOCK = true; // set to false when hooking real backend

const MOCK_ROOMS = [
  {
    _id: "r1",
    name: "Coconut Grove Cottage",
    capacity: 3,
    price: 3200,
    amenities: ["Queen Bed", "AC", "Ensuite", "Breakfast"],
    policies: {
      houseRules: ["Check-in after 1 PM", "No smoking indoors", "Quiet hours after 10 PM"],
      cancellation: { windowHours: 48, refundPercent: 80, note: "Free date change once (48h notice)." },
    },
  },
  {
    _id: "r2",
    name: "Mango Orchard Room",
    capacity: 2,
    price: 2600,
    amenities: ["Double Bed", "Fan", "Garden View"],
    policies: {
      houseRules: ["Check-in after 1 PM", "No loud music"],
      cancellation: { windowHours: 24, refundPercent: 60, note: "Reschedule options available." },
    },
  },
  {
    _id: "r3",
    name: "Lotus Pond Suite",
    capacity: 4,
    price: 4200,
    amenities: ["King Bed", "AC", "Private Deck", "Breakfast"],
    policies: {
      houseRules: ["Check-in after 12 PM", "Pets on request"],
      cancellation: { windowHours: 72, refundPercent: 90, note: "Partial refund otherwise." },
    },
  },
];

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchRooms(date) {
  if (!date) throw new Error("Date required");
  if (USE_MOCK) {
    const today = new Date().toISOString().slice(0, 10);
    const list = MOCK_ROOMS.map((r, i) => ({ ...r, soldOut: date === today && i === 1 })); // demo sold-out
    await delay(300);
    return list;
  }
  const res = await fetch(`/api/rooms?date=${date}`);
  if (!res.ok) throw new Error("Failed to load rooms");
  return res.json();
}

export async function createHold({ date, roomId, guest }) {
  if (USE_MOCK) {
    if (!date || !roomId || !guest?.name) throw new Error("Missing fields");
    await delay(400);
    return { holdId: `hold_${Date.now()}` };
  }
  const res = await fetch(`/api/booking/hold`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, roomId, guest }),
  });
  if (!res.ok) throw new Error("Failed to create hold");
  return res.json();
}

export async function confirmBooking({ holdId, payment }) {
  if (USE_MOCK) {
    if (!holdId || !payment?.method) throw new Error("Missing fields");
    await delay(600);
    return { bookingId: `bk_${Date.now()}`, code: `GV-${Math.floor(Math.random() * 90000 + 10000)}` };
  }
  const res = await fetch(`/api/booking/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ holdId, payment }),
  });
  if (!res.ok) throw new Error("Failed to confirm booking");
  return res.json();
}
