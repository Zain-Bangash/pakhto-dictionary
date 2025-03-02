import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Import React Router
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";   // Import Home page
import Login from "./Login"; // Import Login page
import Dictionary from "./Dictionary"; // Import Dictionary page

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
      <Route path="/dictionary" element={<Dictionary />} />
    </Routes>
  );
};

export default App;
