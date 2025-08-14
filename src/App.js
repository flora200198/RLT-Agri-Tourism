import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './Pages/Home/Home';
import Activities from './Pages/Activities/Activities';
import Contact from './Pages/Contact/Contact';
import './App.css';



export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
