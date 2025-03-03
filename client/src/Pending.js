import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";


const Pending = () => {
  const [words, setWords] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !isAdmin) {
        navigate("/home");
        return;
    }else{
        axios.get('http://localhost:3001/words/pending?limit=10')
        .then((res) => {
            console.log("API Response:", res.data);
            if (Array.isArray(res.data)) {
            setWords(res.data);
            } else if (res.data) {
            setWords([res.data]); // Wrap single object in an array
            }
        })
        .catch((error) => {
            setWords([]); // Ensure it's always an array
        });
    }
  }, []);


  const approveWord = async (wordToRemove) => {
    const response = await axios.post("http://localhost:3001/words/approve-pending", {term: wordToRemove.term});
    setWords((prevWords) => prevWords.filter(word => word.term !== wordToRemove.term));
    setSuccessMessage("'" + wordToRemove.term + "' has been approved and is now visible in the Dictionary!");
  };
  

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">
        📖 <span className="text-primary">Verify & Approve</span>
      </h1>

      {/* Error Message */}
      {successMessage && <div className='success'> {successMessage}</div>}

      {/* Word Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Term</th>
              <th>Definition</th>
              <th>Usage</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {words.length > 0 ? (
              words.map((word) => (
                <tr key={word._id}>
                  <td><strong>{word.term}</strong></td>
                  <td>{word.definition}</td>
                  <td>{word.usage}</td>
                  <td>
                      <button className="btn btn-secondary btn-sm " onClick={() => approveWord(word)}>
                        Approve
                      </button>
                   </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">No words awaiting approval.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pending;
