import React from "react";
import { Outlet } from "react-router-dom"; // 👈 important
import Menu from "../Menu/Menu";
import Navbar from "../NavBar/Navbar"; // matches file name exactly

import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <Menu />
      </aside>

      {/* Main Section */}
      <div className="main-section">
        {/* Top Navbar */}
        <header className="top-navbar">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="page-content">
          <Outlet /> {/* 👈 renders child routes here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
