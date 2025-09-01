import React from 'react';
import { Container, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import homeImage from "../../../Assets/home.png"; // ✅ Import image properly

const CreateAccount = () => {
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();

    // Show success popup
    Swal.fire({
      title: "Account Created!",
      text: "Your account has been successfully created.",
      icon: "success",
      confirmButtonText: "Go to Dashboard",
      confirmButtonColor: "#2563eb"
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to dashboard
        navigate("/dashboard");
      }
    });
  };

  return (
    <div style={styles.loginPage}>
      {/* Left side */}
      <div style={styles.loginLeft}>
        <img
          src={homeImage}
          alt="Home"
          style={styles.homeImage}
        />
      </div>

      {/* Right side */}
      <div style={styles.loginRight}>
        <Container className="h-100 d-flex justify-content-center align-items-center">
          <Card className="shadow w-100">
            <CardBody
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "100%" }}
            >
              <div style={styles.formContainer}>

                <h1 style={styles.heading1}>Welcome Back</h1>
                <h2 style={styles.heading2}>Sign Up</h2>

                <form onSubmit={handleCreateAccount}>
                  <label htmlFor="email" style={styles.label}>Email</label>
                  <input type="email" id="email" placeholder="Enter your email" style={styles.input} />

                  <label htmlFor="password" style={styles.label}>Password</label>
                  <input type="password" id="password" placeholder="Enter your password" style={styles.input} />

                  <label htmlFor="company" style={styles.label}>Company Name</label>
                  <input type="text" id="company" placeholder="Enter your company name" style={styles.input} />

                  <label htmlFor="location" style={styles.label}>Location</label>
                  <input type="text" id="location" placeholder="Enter your location" style={styles.input} />

                  <button type="button" style={styles.googleButton}>
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google Logo"
                      style={{ height: "20px", width: "20px" }}
                    />
                    Continue with Google
                  </button>

                  <button type="submit" style={styles.loginButton}>
                    Create Account
                  </button>
                </form>

                <p style={styles.signupLink}>
                  Already have an account?{" "}
                  <a href="/login" style={styles.signupAnchor}>Log in</a>
                </p>

              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
};

// ✅ Inline styles object
const styles = {
  loginPage: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  loginLeft: {
    width: "50%",
    backgroundColor: "#2563eb", // Tailwind blue-600
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  homeImage: {
    width: "80%",
    maxWidth: "400px",
    height: "auto",
    borderRadius: "12px",
    objectFit: "contain",
    
  },
  loginRight: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
  },
  heading1: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "5rem",
  },
  heading2: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  label: {
    display: "block",
    marginBottom: "0.3rem",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "1rem",
    backgroundColor: "#f3f4f6",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "0.95rem",
  },
  googleButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.6rem",
    marginBottom: "1rem",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loginButton: {
    width: "100%",
    padding: "0.6rem",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  signupLink: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
  signupAnchor: {
    color: "#2563eb",
    textDecoration: "none",
  }
};

export default CreateAccount;
