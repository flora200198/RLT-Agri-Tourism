import axios from "axios";

const API = axios.create({
//   baseURL: "http://localhost:4000/api",  
  baseURL: "http://127.0.0.1:4000/api",   // backend URL
  headers: { "Content-Type": "application/json" }
});

export const PostContactForm = (form) => API.post("/contact", form);

// export const PostContactForm = async (form) => {
//   const response = await fetch("http://localhost:4000/api/contact", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(form),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to submit contact form");
//   }

//   return response.json();
// };
