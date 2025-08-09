import React, { useState, useRef, useEffect } from "react";
import { User, Settings, Users, LogOut } from "lucide-react";
import "../NavBar/Navbar.css";


const ProfileDropdown = ({
  onMyAccount,
  onSettings,
  onAgents,
  onLogout,
  username = "My Profile",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleEvents = (event) => {
      if (event.type === "mousedown") {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      } else if (event.type === "keydown" && event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleEvents);
    document.addEventListener("keydown", handleEvents);
    return () => {
      document.removeEventListener("mousedown", handleEvents);
      document.removeEventListener("keydown", handleEvents);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleMenuClick = (action) => {
    setIsOpen(false);
    if (action) action();
  };

  return (
    <div className={`profile-dropdown-container ${className}`} ref={dropdownRef}>
      {/* Profile Button */}
      <button onClick={toggleDropdown} className="profile-button" type="button">
        <User size={20} />
        <span>{username}</span>
      </button>

      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        <div className="dropdown-content">
          <button
            onClick={() => handleMenuClick(onMyAccount)}
            className="dropdown-item"
          >
            <User size={16} />
            My Account
          </button>

          <button
            onClick={() => handleMenuClick(onSettings)}
            className="dropdown-item"
          >
            <Settings size={16} />
            Settings
          </button>

          <button
            onClick={() => handleMenuClick(onAgents)}
            className="dropdown-item"
          >
            <Users size={16} />
            Agents
          </button>

          <hr className="dropdown-divider" />

          <button
            onClick={() => handleMenuClick(onLogout)}
            className="dropdown-item logout-item"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
