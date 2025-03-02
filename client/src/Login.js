import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login = ({setToken, setRole}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {   
        const res = await axios.post("http://localhost:3001/auth/login", { username, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        setToken(res.data.token);
        setRole(res.data.role);
        navigate("/dictionary");
    } catch(err){
        setErrorMessage("Invalid credentials");
        console.log(err);
    }
  };


  return (
    <div className="container mt-5 text-center">
    {token ? (
        <>
        <p className="mb-4 fs-5 text-muted">You are already logged in, please proceed to the Dictionary</p> 
        <div class="d-flex justify-content-center">
            <div className="d-flex gap-4">
                <Link to="/dictionary" className="btn btn-primary btn-lg">Dictionary</Link>
            </div>
        </div>
        </>
    ) : (
        <>
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center fw-bold">🔐 Login</h2>

        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
      </div>
    </div>
    </>
    )};
    </div>
  );
};

export default Login;
