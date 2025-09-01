import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h2>Total Agents</h2>
          <p>15</p>
        </div>
        <div className="stat-card">
          <h2>Pending Deliveries</h2>
          <p>8</p>
        </div>
        <div className="stat-card">
          <h2>Completed Deliveries</h2>
          <p>23</p>
        </div>
        <div className="stat-card">
          <h2>Low Stock Alerts</h2>
          <p>5</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>Agent John completed delivery #1023 ✅</li>
          <li>Agent Sarah assigned to delivery #1024 🚚</li>
          <li>Low stock warning: Item A (10 left) ⚠️</li>
          <li>New request added by Owner at 2:45 PM 📝</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
