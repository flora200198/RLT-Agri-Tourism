const pricing = {
  adventure: {   // 🔹 renamed to match "type": "adventure"
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

// 🔹 Calculate stay booking totals
function calculateStayTotal(details) {
  const basePrice = pricing.stay.basePrice;
  const totalPersons = parseInt(details.adults) + parseInt(details.children);
  const roomsNeeded = Math.ceil(totalPersons / pricing.stay.personLimit);

  const additionalPersonCost = Math.max(
    0,
    totalPersons - (pricing.stay.personLimit * roomsNeeded)
  ) * pricing.stay.additionalPersonCharge;

  return {
    basePrice: basePrice * roomsNeeded,
    additionalPersonCost,
    total: (basePrice * roomsNeeded) + additionalPersonCost,
    roomsNeeded,
    totalPersons
  };
}

// 🔹 Main validation + calculation logic
function validateAndCalculate(type, details) {
  if (type === "adventure") {
    if (!details.activity || !details.numGuests || !details.date || !details.time) {
      throw new Error("Incomplete adventure booking details");
    }

    if (!pricing.adventure[details.activity]) {
      throw new Error("Invalid activity");
    }

    const total = pricing.adventure[details.activity] * details.numGuests;
    return { ...details, total };
  }

  if (type === "stay") {
    if (!details.adults || !details.children || !details.checkInDate || !details.checkOutDate) {
      throw new Error("Incomplete stay booking details");
    }

    const checkIn = new Date(details.checkInDate);
    const checkOut = new Date(details.checkOutDate);

    if (checkOut <= checkIn) {
      throw new Error("Invalid check-in/check-out dates");
    }

    return { ...details, ...calculateStayTotal(details) };
  }

  throw new Error("Invalid booking type");
}

module.exports = { validateAndCalculate };
