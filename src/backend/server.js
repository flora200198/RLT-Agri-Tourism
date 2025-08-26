const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./Config/ConnectDB');
const Contact = require('./Routes/Contact');
const cors = require('cors')

app.use(cors());
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5000;
connectDB();

app.use('/api', Contact)

app.use('/', (req, res) =>{
    res.send("Welcome to Agri tourism Backend Server")
});



app.listen(PORT, (req, res)=>{
console.log(`Server running on ${PORT}`)
});

module.exports = app;