import { useLocation, Link } from "react-router-dom";
import React from "react";
import "../assets/css/NavBar.css";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/img/navbar-logo.png" alt="Logo" className="logo-img" />
          <span>Home</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/grading-form" className={`nav-button ${isActive("/grading-form") ? "active" : ""}`}>
          Grade Now!
        </Link>
        <Link to="/rubrics" className={`nav-button ${isActive("/rubrics") ? "active" : ""}`}>
          Rubrics
        </Link>
        <Link to="/user-guide" className={`nav-button ${isActive("/user-guide") ? "active" : ""}`}>
          User Guide
        </Link>
        <Link to="/about-us" className={`nav-button ${isActive("/about-us") ? "active" : ""}`}>
          About Us
        </Link>
      </div>
    </nav>
  );
}
