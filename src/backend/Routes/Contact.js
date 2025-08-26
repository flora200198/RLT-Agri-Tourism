const express = require('express');
const router = express.Router();
const Contact = require ('../Models/Contact.model');

router.post('/contact', async(req, res) => {
    const {name, phone, message} = req.body;    

    if(!name || !phone){
        return res.status(400).json({ok:false, message:'Name and Phone are required' })
    }

    const clean = {
        name: String(name).trim(),
        phone: String(phone).trim(),
        message: message? String(message).trim():'',
    }
    try{
        const contact = await Contact.create(clean);
        console.log(contact);
       res.status(201).json({ok: true, message:'Contact submitted successfully'});

    }catch (error){
        console.error("Error saving the data:", error);
        res.status(500).json({ok:false, message: 'Internal Server Error'})
    }
})

module.exports = router;
