import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UrlHistory() {
  const [urlHistory, setUrlHistory] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrlHistory = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get("http://99.79.70.20:8080/api/urls", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUrlHistory(response.data);
      } catch (err) {
        setError(
          err.response
            ? err.response.data.message
            : "An error occurred while fetching URL history."
        );
      }
    };

    fetchUrlHistory();
  }, [navigate]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h2>My URL History</h2>
      {urlHistory.length > 0 ? (
        <ul className="list-group">
          {urlHistory.map((url, index) => (
            <li key={index} className="list-group-item">
              <div>
                <strong>Title:</strong> {url.Title || "N/A"}
              </div>
              <div>
                <strong>Short URL:</strong>{" "}
                <a
                  href={url.shortURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.shortURL}
                </a>
              </div>
              <div>
                <strong>Long URL:</strong>{" "}
                <a href={url.longURL} target="_blank" rel="noopener noreferrer">
                  {url.longURL}
                </a>
              </div>
              <div>
                <img
                  src={url.Avatar}
                  alt="URL Avatar"
                  style={{ height: "30px", width: "30px" }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No URL history found.</p>
      )}
    </div>
  );
}

export default UrlHistory;
