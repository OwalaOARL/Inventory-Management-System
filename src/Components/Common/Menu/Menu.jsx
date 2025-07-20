import React from "react";
import { NavLink } from "react-router-dom";
import { Home, User, Settings, LogOut } from "lucide-react";
import "./Menu.css";

const Menu = () => {
  const menuItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
    { name: "Logout", path: "/logout", icon: <LogOut size={18} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">My App</div>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
