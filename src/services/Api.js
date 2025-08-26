import axios from 'axios';
// const base_url = "http://localhost:5000/api"

const API = axios.create({
    baseURL:  "http://localhost:5000/api",
    headers: { "Content-Type": "application/json" }
})

export const PostContactForm = (form) => API.post('/contact', form);