import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="navbar-title"></span>
      <a href="/profile" className="navbar-link" style={{ textDecoration: 'none' }}>My Profile</a>
    </nav>
  );
};

export default Navbar;
