import React from "react";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import UrlEncoder from "./components/UrlEncode";
import UrlDecoder from "./components/UrlDecoder";
import UrlHistory from "./components/UrlHistory";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/encode" element={<UrlEncoder />}></Route>
          <Route path="/decode" element={<UrlDecoder />}></Route>
          <Route path="/myhistory" element={<UrlHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
