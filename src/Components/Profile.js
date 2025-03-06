import React from "react";
import "./Profile.css";

const Profile = () => {
  const menuItems = [
    'My Account',
    'Settings',
    'My Agents',
    'Chat'
  ];

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${item === 'My Account' ? 'active' : ''}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
