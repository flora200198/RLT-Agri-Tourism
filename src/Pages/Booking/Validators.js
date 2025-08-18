// src/modules/booking/validators.js
export const isValidEmail = (v) => /.+@.+\..+/.test(v);
export const isValidPhone = (v) => /^\+?\d[\d\s-]{7,14}$/.test(v);
