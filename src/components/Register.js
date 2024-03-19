import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        email,
        password,
      });
      console.log("Login success:", response.data);
      const token = response.data;
      localStorage.setItem("jwtToken", token);
    } catch (error) {
      //console.log("Login error: " + error.response || error.message);
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An error occurred. Please try again later.");
      }
    }
  };
  // axios.get('http://localhost:8080/some-protected-route', {\

  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
  // }
  // })
  // .then(response => {
  //   // Handle the response data
  // })
  // .catch(error => {
  //   // Handle the error
  // });

  return (
    <div className="container">
      <h3>Register</h3>
      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
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
          ></input>
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
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
