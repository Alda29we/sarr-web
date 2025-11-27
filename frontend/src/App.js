import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Inicio from "./pages/Inicio";
import Services from "./pages/Services";
import Licenses from "./pages/Licenses";
import Contact from "./pages/Contact";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-slate-950">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/licencias" element={<Licenses />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
