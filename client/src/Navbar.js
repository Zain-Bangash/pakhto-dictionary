import React from "react";
import {useNavigate, useLocation, UNSAFE_LocationContext } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");  // ✅ Check login status directly
  const showHomeButton = location.pathname !== "/";
  const showLoginButton = location.pathname !== "/login" && !token;


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-light bg-light px-3 mb-4 d-flex justify-content-between">
      {/* 🔹 Home Button (Top Left) */}
      {showHomeButton && (<button className="btn btn-primary" onClick={() => navigate("/")}>🏠 Home</button>)}

      {/* 🔹 Logout Button (Top Right, Only if Logged In) */}
      {token ?  (
        <button className="btn btn-danger" onClick={handleLogout}>🚪 Logout</button>
      ) : (showLoginButton && (
            <button className="btn btn-success" onClick={() => navigate("/login")}>Login</button>
        )
    )}  
    </nav>
  );
};

export default Navbar;
