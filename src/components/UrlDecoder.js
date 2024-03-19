import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UrlDecoder() {
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage if JWT token is not present
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/");
    }
  }, [navigate]);

  const decodeUrl = async (event) => {
    event.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/urls/${shortUrl}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      // The backend is expected to redirect, but we'll handle redirection in the frontend for demonstration
      window.location.href = response.request.responseURL;
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message
          : "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="container">
      <h2>Decode URL</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={decodeUrl}>
        <div className="form-group">
          <label htmlFor="shortUrl">Short URL Code</label>
          <input
            type="text"
            className="form-control"
            id="shortUrl"
            placeholder="Enter the code (e.g., kzwXX)"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Decode
        </button>
      </form>
    </div>
  );
}

export default UrlDecoder;
