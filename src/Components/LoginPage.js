import React from "react";
import Button from "./Button";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <img src="/assets/login-image.png" alt="Shopping" className="illustration" />
      <p>Find Your Agent....</p>
      <Button text="Login" onClick={() => alert("Login Clicked")} />
      <p>New user? <a href="/create-account" className="create-account">Create Account</a></p>
    </div>
  );
};

export default LoginPage;
