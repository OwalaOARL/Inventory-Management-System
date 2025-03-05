import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
  
        <a href="/profile" className="navbar-link" style={{ textDecoration: 'none', marginLeft: 'auto' }}>My Profile</a>
      </div>
    </nav>
  );
};

export default Navbar;