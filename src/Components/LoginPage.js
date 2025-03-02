import React from "react";
import Button from "./Button";
import "./LoginPage.css";


const LoginPage = () => {
  return (
    <div className="Loginpage">
  <div className="img-container">
    <img src="/assets/login-image.png" alt="login-image" className="illustration" />
  </div>

  <div className="title-container">
    <p className="login-text">Find Your Agent....</p>
  </div>

  <div className="button-container">
    <Button text="Login" onClick={() => alert("Login Clicked")} />
  </div>

  <div className="account-container">
    <p>New user? <a href="/create-account" className="create-account">Create Account</a></p>
  </div>
</div>

  );
};

export default LoginPage;
