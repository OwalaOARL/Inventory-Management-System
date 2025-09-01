import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Settings,
  Users,
  PackageMinus,
  PlusSquare,
  Truck,
  CheckSquare,
} from "lucide-react";
import "./Menu.css"; // Make sure Menu.css exists in the same folder

const Menu = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard/dashboard", icon: <User size={18} /> },
    { name: "My Account", path: "/dashboard/my-account", icon: <User size={18} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={18} /> },
    { name: "Agent", path: "/dashboard/agent", icon: <Users size={18} /> },
    { name: "Agent Details", path: "/dashboard/agent-details", icon: <Users size={18} /> },
    { name: "Low Stock", path: "/dashboard/low-stock", icon: <PackageMinus size={18} /> },
    { name: "Add Request", path: "/dashboard/add-request", icon: <PlusSquare size={18} /> },
    { name: "Pending Deliveries", path: "/dashboard/pending-deliveries", icon: <Truck size={18} /> },
    { name: "Completed Deliveries", path: "/dashboard/completed-deliveries", icon: <CheckSquare size={18} /> },
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
