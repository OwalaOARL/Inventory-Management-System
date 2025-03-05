import React from 'react';
import './SideBar.css';

const Sidebar = () => {
  const menuItems = [
    'Dashboard',
    'Low stock',
    'Agent Details',
    'Order Request'
  ];

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${item === 'Agent Details' ? 'active' : ''}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
