export async function confirmBooking({ type, customerName, customerPhone, payment, stayDetails, activityDetails }) {
  const res = await fetch(`http://localhost:4000/api/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      customerName,
      customerPhone,
      payment,
      stayDetails,
      activityDetails
    }),
  });
  if (!res.ok) throw new Error("Failed to confirm booking");
  return res.json();
}


// export async function confirmBooking({ holdId, payment }) {
//   if (USE_MOCK) {
//     if (!holdId || !payment?.method) throw new Error("Missing fields");
//     await delay(600);

//     return {
//       bookingId: `bk_${Date.now()}`,
//       code: `GV-${Math.floor(Math.random() * 90000 + 10000)}`,
//       totalAmount: 4500,
//       booking: {
//         type: "adventure",
//         customerName: "John Doe",
//         customerPhone: "9876543210",
//         payment: payment.method,
//         details: {
//           activity: "farm",
//           numGuests: 3,
//           date: "2025-09-10",
//           time: "10:00",
//         },
//       },
//     };
//   }

//   const res = await fetch(`/api/booking/confirm`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ holdId, payment }),
//   });
//   if (!res.ok) throw new Error("Failed to confirm booking");
//   return res.json();
// }

