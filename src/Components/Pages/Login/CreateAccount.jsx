import React from 'react';
import { Container, Card, CardBody } from "reactstrap";

const CreateAccount = () => {
  return (
    <div className="login-page">
      {/* Left side */}
      <div className="login-left">
        <img
          src="/assets/home.png" // Place your image here
          className="homeImage"
        />
      </div>

      {/* Right side */}
      <div className="login-right">
        <Container className="h-100 d-flex justify-content-center align-items-center">
          <Card className="shadow w-100">
            <CardBody className="d-flex justify-content-center align-items-center" style={{ minHeight: "100%" }}>
              <div className="login-form-container w-100" style={{ maxWidth: "400px" }}>

                <h1>Welcome Back</h1>
                <h2>Sign Up</h2>

                <form>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter your email" />

                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="Enter your password" />

                  <label htmlFor="company">Company Name</label>
                  <input type="text" id="company" placeholder="Enter your company name" />

                  <label htmlFor="location">Location</label>
                  <input type="text" id="location" placeholder="Enter your location" />

                  <button type="button" className="google-button">
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google Logo"
                    />
                    Continue with Google
                  </button>

                  <button type="submit" className="login-button">
                    Create Account
                  </button>
                </form>

                <p className="signup-link">
                  Already have an account? <a href="#">Log in</a>
                </p>

              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default CreateAccount;
