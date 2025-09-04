import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from "chart.js";
import "./Dashboard.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Dashboard = () => {
  // Pie chart data
  const pieData = {
    labels: ["Completed", "Pending", "Low Stock"],
    datasets: [
      {
        data: [23, 8, 5],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        hoverOffset: 10,
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Deliveries",
        data: [15, 20, 25, 30, 28, 35, 40],
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  };

  // Line chart data
  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "New Requests",
        data: [5, 7, 3, 8],
        borderColor: "#F97316",
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { mode: "index", intersect: false },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card bg-gradient-blue">
          <h3>Total Agents</h3>
          <p>15</p>
        </div>
        <div className="stat-card bg-gradient-yellow">
          <h3>Pending Deliveries</h3>
          <p>8</p>
        </div>
        <div className="stat-card bg-gradient-green">
          <h3>Completed Deliveries</h3>
          <p>23</p>
        </div>
        <div className="stat-card bg-gradient-red">
          <h3>Low Stock Alerts</h3>
          <p>5</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-box">
          <h3>Deliveries Status</h3>
          <Pie data={pieData} options={chartOptions} />
        </div>
        <div className="chart-box">
          <h3>Monthly Deliveries</h3>
          <Bar data={barData} options={chartOptions} />
        </div>
        <div className="chart-box">
          <h3>Weekly Requests</h3>
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
