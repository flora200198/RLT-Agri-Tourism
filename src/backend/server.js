// console.log("🚀 server.js started...");

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const mongoose = require('mongoose');

// // Load environment variables
// dotenv.config();

// const connectDB = require('./Config/ConnectDB');
// const Contact = require('./Routes/Contact');

// const app = express();
// app.use(cors({
//   origin: "http://localhost:3000",   // frontend
//   methods: ["GET", "POST"],
//   credentials: true
// }));
// const PORT = process.env.PORT || 4000;



// // Middleware

// app.use(express.json());

// // Routes
// app.use('/api', Contact);

// app.get('/', (req, res) => {
//     res.send("Welcome to Agri Tourism Backend Server");
// });


// try {
//   app.listen(PORT, () => {
//     console.log(`✅ Server running on http://localhost:${PORT}`);
//   });
// } catch (err) {
//   console.error("❌ Failed to start server:", err);
// }


// module.exports = app;

console.log("🚀 server.js started...");

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const Contact = require('./Routes/Contact');

const app = express();
app.use(cors({
  origin: "http://localhost:3000",   // frontend
  methods: ["GET", "POST"],
  credentials: true
}));

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', Contact);

app.get('/', (req, res) => {
  res.send("Welcome to Agri Tourism Backend Server (No DB)");
});

// Start server (no MongoDB)
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = app;
