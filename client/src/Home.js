import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const isAdmin = localStorage.getItem("token") && (localStorage.getItem("role") === "admin");

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4 fw-bold">📖 Welcome to the Pashto Dictionary</h1>
      <p className="mb-4 fs-5 text-muted">Start browsing the dictionary.</p>
      
      {/* Add the logo */}
      <div className="d-flex gap-3">
        <img src="/logo.png" alt="Khpal Taki Logo" className="logo" style={{ width: "200px", height: "180px"}}/>
        <br/>
      </div>
      <br/>
      <div className="d-flex gap-4">
        <Link to="/dictionary" className="btn btn-success btn-lg">📚 View Dictionary</Link>
      
        {isAdmin && (<Link to="/pending" className="btn btn-primary btn-lg">⏳ View Pending Words</Link>)}
      </div>  
    </div>
  );
};

export default Home;
