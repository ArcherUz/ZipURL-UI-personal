import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to ZipURL</h1>
      <div>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>{" "}
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
        <Link to="/encode" className="btn btn-primary">
          Short My Url
        </Link>
      </div>
    </div>
  );
}
export default HomePage;
