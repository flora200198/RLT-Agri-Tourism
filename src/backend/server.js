const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./Config/ConnectDB');

dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5000;
connectDB();

app.use('/', (req, res) =>{
    res.send("Welcome Agri tourism")
});

app.listen(PORT, (req, res)=>{
console.log(`Server running on ${PORT}`)
});

module.exports = app;