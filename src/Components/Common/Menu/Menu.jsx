import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Settings,
  Users,
  PackageMinus,
  PlusSquare
} from "lucide-react";
import "./Menu.css"; // Make sure Menu.css exists in the same folder

const Menu = () => {
  const menuItems = [
    { name: "My Account", path: "/my-account", icon: <User size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
    { name: "Agent", path: "/agent", icon: <Users size={18} /> },
    { name: "Agent Details", path: "/agent-details", icon: <Users size={18} /> },
    { name: "Low Stock", path: "/low-stock", icon: <PackageMinus size={18} /> },
    { name: "Add Request", path: "/add-request", icon: <PlusSquare size={18} /> },
    { name: "Pending Deliveries", path: "/pending-deliveries", icon: <PlusSquare size={18} /> },
    { name: "Completed Deliveries", path: "/completed-deliveries", icon: <PlusSquare size={18} /> },

  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">My App</div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
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
