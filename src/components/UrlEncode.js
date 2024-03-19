import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UrlEncoder() {
  const [longUrl, setLongUrl] = useState("");
  const [algorithm, setAlgorithm] = useState("base64");
  const [encodedUrl, setEncodedUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/");
    }
  }, [navigate]);

  const encodeUrl = async (event) => {
    event.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        `http://99.79.70.20:8080/api/urls/${algorithm}`,
        { longUrl },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setEncodedUrl(response.data);
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
      <h2>Encode URL</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={encodeUrl}>
        <div className="form-group">
          <label htmlFor="longUrl">Long URL</label>
          <input
            type="text"
            className="form-control"
            id="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Select Encoding Algorithm</label>
          <select
            className="form-control"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="md5">MD5</option>
            <option value="base64">Base64</option>
            <option value="base62">Base62</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Encode
        </button>
      </form>
      {encodedUrl && (
        <div className="alert alert-success mt-3">
          Encoded URL:{" "}
          <a
            href={encodedUrl.shortURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {encodedUrl.shortURL}
          </a>
          Title:{encodedUrl.Title}
          <br />
          <img
            src={encodedUrl.Avatar}
            alt="Avatar"
            style={{ width: 50, height: 50 }}
          />
        </div>
      )}
    </div>
  );
}

export default UrlEncoder;
