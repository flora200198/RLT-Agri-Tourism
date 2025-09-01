import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './Pages/Home/Home';
import Activities from './Pages/Activities/Activities';
import Contact from './Pages/Contact/Contact';
import './App.css';
import AboutFarm from './Pages/About/About';
import ProductsSection from './Pages/Product/Product';
import ProductPage from './Pages/Product/ProductDetail'; // Updated import for ProductPage
import BookingPage from './Pages/Booking/Bookings';
import WhatsAppButton from './components/Whatsapp/Whatsapp';
import ServicePage from './Pages/Services/ServicesDetail'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<AboutFarm/>} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/products" element={<ProductsSection />} />
        <Route path="/productPage/:slug" element={<ProductPage />} />
        <Route path="/servicePage/:slug" element={<ServicePage />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/activities/book" element={<BookingPage />} />
        <Route path="/staying/book" element={<BookingPage />} />
      </Routes>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
