import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  // State for login information
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for storing login errors
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Post data to backend for login
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      console.log("Login success:", response.data);
      localStorage.setItem("jwtToken", response.data);
      navigate("/encode");
    } catch (error) {
      if (error.response && error.response.data) {
        // Backend returns error response
        setErrorMessage(error.response.data.message);
      } else {
        // Something went wrong in sending request
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <h3>Login</h3>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
