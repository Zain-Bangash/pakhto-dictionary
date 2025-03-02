import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4 fw-bold">📖 Welcome to the Pashto Dictionary</h1>
      <p className="mb-4 fs-5 text-muted">Start browsing the dictionary.</p>

      <div className="d-flex gap-4">
        <Link to="/dictionary" className="btn btn-success btn-lg">📚 View Dictionary</Link>
      </div>
    </div>
  );
};

export default Home;
