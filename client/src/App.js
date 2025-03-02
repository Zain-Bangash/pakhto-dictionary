import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";   // Import Home page
import Login from "./Login"; // Import Login page
import Dictionary from "./Dictionary"; // Import Dictionary page
import Navbar from "./Navbar";

const App = () => {
  return (
    <div className="container mt-3">
      {/* 🔹 Navbar on Every Page */}
      <Navbar  />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dictionary" element={<Dictionary />} />
      </Routes>
    </div>
  );
};

export default App;
