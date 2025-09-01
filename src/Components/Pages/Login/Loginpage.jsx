import React from 'react';
import './Loginpage.css';
import { Container, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import homeImage from "../../../Assets/home.png";



const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form reload
    // Redirect to dashboard (Menu will load as part of Layout)
    navigate("/dashboard/my-account"); 
  };

  return (
    <div className="login-page">
      {/* Left side */}
      <div className="login-left">
        <img
          src={homeImage}   // ✅ Use the imported image
          className="homeImage"
          alt="Home"
        />
      </div>

      {/* Right side */}
      <div className="login-right">
        <Container className="h-100 d-flex justify-content-center align-items-center">
          <Card className="shadow w-100">
            <CardBody className="d-flex justify-content-center align-items-center" style={{ minHeight: "100%" }}>
              <div className="login-form-container w-100" style={{ maxWidth: "400px" }}>
                
                <h1>Welcome Back</h1>
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
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
                  Don’t have an account?{" "}
                  <a onClick={() => navigate("/create-account")} href="#!">
                    Create an account
                  </a>
                </p>

              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
