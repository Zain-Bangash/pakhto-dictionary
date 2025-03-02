import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";


const Dictionary = () => {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({ term: '', definition: '', usage: '' });
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/words?limit=10')
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/dictionary");
  };

  const addWord = async () => {
    if (!newWord.term || !newWord.definition || !newWord.usage) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/words/add", newWord);
      
      // Success: Add new word to the list and clear the form
      setWords((prevWords) => [...prevWords, response.data]);
      setNewWord({ term: "", definition: "", usage: "" });
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        if (error.response && error.response.status === 400 && error.response.data.error === "This word already exists in the dictionary!") {
          setErrorMessage("This word already exists!");
        } else {
          setErrorMessage("Something went wrong, please try again!");
        }
      }
    }
  };
  

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">
        📖 <span className="text-primary">Bangash Pashto Dictionary</span>
      </h1>

      {!token ? (
        <>
        <p className="mb-4 fs-5 text-muted">Login to add words!</p> 
        <div class="d-flex justify-content-center">
            <div className="d-flex gap-4">
                <Link to="/login" className="btn btn-primary btn-lg">🔐 Login</Link>
            </div>
        </div>
        </>
        ) : (
            <>
            <button className="btn btn-danger mb-3" onClick={handleLogout}>
                Logout
            </button>

            {/* Input Form */}
            <div className="row justify-content-center mb-3">
                <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Term"
                    value={newWord.term}
                    onChange={(e) => setNewWord({ ...newWord, term: e.target.value })}
                />
                </div>
                <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Definition"
                    value={newWord.definition}
                    onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
                />
                </div>
                <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Usage"
                    value={newWord.usage}
                    onChange={(e) => setNewWord({ ...newWord, usage: e.target.value })}
                />
                </div>
                <div className="col-md-3">
                <button className="btn btn-primary w-100" onClick={addWord} disabled={!newWord.term || !newWord.definition || !newWord.usage}>
                    ➕ Add Word
                </button>
                </div>
            </div>
            </>
        )}


      {/* Error Message */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Word Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Term</th>
              <th>Definition</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            {words.length > 0 ? (
              words.map((word) => (
                <tr key={word._id}>
                  <td><strong>{word.term}</strong></td>
                  <td>{word.definition}</td>
                  <td>{word.usage || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">No words added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dictionary;
