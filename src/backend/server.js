const express = require('express');
const Contact = require('./Routes/Contact');
const Activity = require('./Routes/activities');
const Stay = require('./Routes/Staying');
const bookingRoutes = require('./Routes/bookingRoute');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', Contact);
app.use('/api', bookingRoutes);

app.use('/', (req, res) => {
  res.send("Welcome to Agri Tourism Backend Server");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
