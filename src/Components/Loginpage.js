// src/components/LoginPage.js
import React from 'react';
import './Loginpage.css';
// adjust the path if needed


 

const LoginPage = () => {
  return (
    <div className="login-page">
      {/* Left side */}
      <div className="login-left">
        <img
          src="/assets/home.png" // Place your image here
          
          className="homeImage"/>
      </div>

      {/* Right side */}
      <div className="login-right">
        <div className="login-form-container">
          <h1>Welcome Back</h1>
          <h2>Login</h2>

          <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />

            <button type="button" className="google-button">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
              />
              Continue with Google
            </button>

            <button type="submit" className="login-button">
              Log in
            </button>
          </form>

          <p className="signup-link">
            Don’t have an account? <a href="#">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
