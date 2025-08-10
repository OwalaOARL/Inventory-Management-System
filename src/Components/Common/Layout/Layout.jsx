import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import Menu from "../Menu/Menu";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();

  // Pages without Navbar + Menu
  const hideNavAndMenu = ["/", "/create-account"];
  const shouldHide = hideNavAndMenu.includes(location.pathname);

  return shouldHide ? (
    <div className="layout-main">
      <Outlet />
    </div>
  ) : (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <Menu />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;