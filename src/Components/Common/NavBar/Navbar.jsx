import React from "react";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

import "./Navbar.css";

const Navbar = () => {
  const handleMyAccount = () => {
    console.log("Navigate to My Account");
  };

  const handleSettings = () => {
    console.log("Navigate to Settings");
  };

  const handleAgents = () => {
    console.log("Navigate to Agents");
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <nav className="navbar">
      <span className="navbar-title">Inventory Management System</span>

      {/* Profile Dropdown */}
      <ProfileDropdown
        onMyAccount={handleMyAccount}
        onSettings={handleSettings}
        onAgents={handleAgents}
        onLogout={handleLogout}
        username="My Profile"
      />
    </nav>
  );
};

export default Navbar;
