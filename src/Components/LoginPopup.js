import React from "react";
import "./LoginPopup.css";

const LoginPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
       <div className="title">Login/Sign in</div>
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
        <button className="continue-button">Continue</button>

        <div className="social-login-container">
  <button className="social-login google-login">
    <img src="/assets/google-icon.png"className="social-icon" />
    Continue with Google
  </button>
  
  <button className="social-login facebook-login">
    <img src="/assets/facebook-icon.png"className="social-icon" />
    Continue with Facebook
  </button>
</div>

        
      </div>
    </div>
  );
};

export default LoginPopup;
