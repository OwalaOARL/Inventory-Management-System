import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";  // Import the CSS file
import loginImage from "../assets/login-image.png"; // Ensure this path is correct

const LoginPage = () => {
  return (
    <div className="container">
      {/* Top Purple Bar */}
      <div className="top-bar"></div>

      {/* Main Content */}
      <div className="content">
        <img src={loginImage} alt="Login" className="login-image"height="250px" width="800px"/>

        <h2 className="title">Find Your Agent....</h2>

        <button className="login-button">Login</button>

        <p className="new-user-text">
          New user? <Link to="/signup" className="create-account">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
