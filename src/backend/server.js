const express = require('express');
const Contact = require('./Routes/Contact');
const Activity = require('./Routes/activities');
const Stay = require('./Routes/Staying');
const app = express();
const PORT = 4000;

app.use(express.json());

// Routes
app.use('/api', Contact);
app.use('/api/activity', Activity);
app.use('/api/staying', Stay);


app.use('/', (req, res) => {
  res.send("Welcome to Agri Tourism Backend Server");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
