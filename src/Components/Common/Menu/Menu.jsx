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
import { useAuth } from "../../../context/AuthContext"; // Import your auth context
import "./Menu.css";
import homeIcon from "../../../Assets/home.png";

const Menu = () => {
  const { user } = useAuth(); // Get current user info
  
  // Get user role
  const userRole = user?.roleName;

  // Define menu items based on role
  const getMenuItems = () => {
    const commonItems = [
      {
        name: "Dashboard",
        path: "/dashboard/dashboard",
        icon: <User size={18} />,
        roles: ["OWNER", "ADMIN", "AGENT"]
      },
      {
        name: "My Account",
        path: "/dashboard/my-account",
        icon: <User size={18} />,
        roles: ["OWNER", "ADMIN", "AGENT"]
      },
      {
        name: "Settings",
        path: "/dashboard/settings",
        icon: <Settings size={18} />,
        roles: ["OWNER", "ADMIN", "AGENT"]
      }
    ];

    const ownerAdminItems = [
      {
        name: "Agent",
        path: "/dashboard/agent",
        icon: <Users size={18} />,
        roles: ["OWNER", "ADMIN"]
      },
      {
        name: "Agent Details",
        path: "/dashboard/agent-details",
        icon: <Users size={18} />,
        roles: ["OWNER", "ADMIN"]
      },
      {
        name: "Low Stock",
        path: "/dashboard/low-stock",
        icon: <PackageMinus size={18} />,
        roles: ["OWNER", "ADMIN"]
      }
    ];

    const orderItems = [
      // Owner/Admin Orders (with add functionality)
      {
        name: "Orders",
        path: "/dashboard/add-request",
        icon: <PlusSquare size={18} />,
        roles: ["OWNER", "ADMIN"]
      },
      // Agent Orders (view and manage only)
      {
        name: "Orders",
        path: "/dashboard/orders",
        icon: <PlusSquare size={18} />,
        roles: ["AGENT"]
      }
    ];

    // Combine all items
    const allItems = [...commonItems, ...ownerAdminItems, ...orderItems];
    
    // Filter items based on user role
    return allItems.filter(item => item.roles.includes(userRole));
  };

  const menuItems = getMenuItems();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          src={homeIcon}
          alt="Home"
          style={{ width: "70px", height: "70px", objectFit: "contain" }}
        />
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={`${item.path}-${index}`}> {/* Use unique key */}
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